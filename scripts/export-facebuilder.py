"""Retarget the FaceBuilder head to the approved portrait's drawn proportions.

Depth uses the aligned illustration reconstruction's camera frame; photo-based
FACS are retained. The approved frontal silhouette stays unchanged.
"""
from pathlib import Path
import math
import json
from collections import Counter
import numpy as np
import bpy
import bmesh
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

project = Path(__file__).resolve().parents[1]
folder = project / 'design/avatar/facebuilder'
bpy.ops.wm.open_mainfile(filepath=str(folder / 'ink-projection.blend'))
from keentools.addon_config import fb_settings
settings = fb_settings()
ink_head = settings.heads[0].headobj
ink_camera = settings.heads[0].cameras[0].camobj
scene = bpy.context.scene
projected = [world_to_camera_view(scene, ink_camera, ink_head.matrix_world @ v.co) for v in ink_head.data.vertices]
view_points = [ink_camera.matrix_world.inverted() @ ink_head.matrix_world @ v.co for v in ink_head.data.vertices]
depth_mid = (min(-v.z for v in view_points)+max(-v.z for v in view_points))/2
aligned_depth = [(-v.z-depth_mid)*0.85 for v in view_points]
camera_matrix = ink_camera.matrix_world.copy()
camera_data = ink_camera.data.copy()
camera_data.use_fake_user = True
# Store the projection settings before opening the photograph reconstruction.
camera_lens = camera_data.lens
camera_sensor = camera_data.sensor_width
camera_shift = (camera_data.shift_x, camera_data.shift_y)
camera_sensor_fit = camera_data.sensor_fit

bpy.ops.wm.open_mainfile(filepath=str(folder / 'ryan-facebuilder.blend'))
settings = fb_settings()
head = settings.heads[0]
face = head.headobj
face.name = 'Ryan_FaceBuilder_Face'
loader = settings.loader()
loader.load_model(0)
from keentools.utils.blendshapes import create_facs_blendshapes
print('FACS_CREATED', create_facs_blendshapes(face, 1.0), flush=True)
print('FACS_NAMES', [k.name for k in face.data.shape_keys.key_blocks], flush=True)
bpy.ops.wm.save_as_mainfile(filepath=str(folder/'ryan-facebuilder-rig.blend'))
# Preserve all facial controls in the editable file; web export keeps eye controls.
for key in list(face.data.shape_keys.key_blocks)[1:]:
    if not any(term in key.name.lower() for term in ['blink', 'look']):
        face.shape_key_remove(key)

# Corresponding vertices give both the UVs and the intended drawn proportions.
# Retarget all shape keys with the same offset, retaining FACS deformations.
portrait_size = 4.8
basis = [v.co.copy() for v in face.data.shape_keys.key_blocks[0].data]
for key in face.data.shape_keys.key_blocks:
    for index, vertex in enumerate(key.data):
        p = projected[index]
        vertex.co.x += (p.x-0.5)*portrait_size-basis[index].x
        vertex.co.z += (p.y-0.5)*portrait_size-basis[index].z
        # Use depth in the same aligned camera frame as the frontal coordinates.
        # Mixing photo-local Y with illustration-camera X/Z sheared the temples.
        vertex.co.y += aligned_depth[index]-basis[index].y
        # The back of the captured shoulder patch projects outside the neck.
        # Keep it inside the illustrated neck contour, below the jaw.
        if vertex.co.z < -0.72:
            limit = 0.69+0.16*max(0,min(1,(vertex.co.z+1.18)/0.46))
            vertex.co.x = max(-limit,min(limit,vertex.co.x))
for vertex, source in zip(face.data.vertices, face.data.shape_keys.key_blocks[0].data):
    vertex.co = source.co
face.data.update()

scene = bpy.context.scene
scene.render.resolution_x = scene.render.resolution_y = 1280
scene.render.resolution_percentage = 100
cam_data = bpy.data.cameras.new('Ink_projection_camera')
cam_data.lens = camera_lens
cam_data.sensor_width = camera_sensor
cam_data.sensor_fit = camera_sensor_fit
cam_data.shift_x, cam_data.shift_y = camera_shift
projector = bpy.data.objects.new('Ink_projection_camera', cam_data)
scene.collection.objects.link(projector)
projector.matrix_world = camera_matrix

art = bpy.data.images.load(str(project / 'design/avatar/ryan-ink-reference-v5.png'), check_existing=True)
art.pack()
pixels=np.empty(len(art.pixels),dtype=np.float32)
art.pixels.foreach_get(pixels)
pixels=pixels.reshape(art.size[1],art.size[0],4)
def is_backdrop(uv):
    x=max(0,min(art.size[0]-1,int(uv[0]*art.size[0])))
    y=max(0,min(art.size[1]-1,int(uv[1]*art.size[1])))
    r,g,b=pixels[y,x,:3]
    return r > 0.08 and r > g*1.8 and r > b*1.4
def emission(name, color=None, texture=False):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    nodes.clear()
    output = nodes.new('ShaderNodeOutputMaterial')
    shader = nodes.new('ShaderNodeEmission')
    shader.inputs['Strength'].default_value = 1
    mat.node_tree.links.new(shader.outputs[0], output.inputs['Surface'])
    if texture:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = art
        tex.extension = 'EXTEND'
        mat.node_tree.links.new(tex.outputs['Color'], shader.inputs['Color'])
    else:
        shader.inputs['Color'].default_value = (*color, 1)
    return mat

portrait = emission('FaceBuilder_engraved_art', texture=True)
paper = emission('FaceBuilder_ivory', (0.855,0.788,0.634))
black = emission('FaceBuilder_ink', (0.004,0.005,0.003))
face.data.materials.clear()
for material in [portrait, paper, black]: face.data.materials.append(material)
uv = face.data.uv_layers.active
for loop in face.data.loops:
    p = projected[loop.vertex_index]
    uv.data[loop.index].uv = (p.x, p.y)
for polygon in face.data.polygons:
    # Hide image projection on the back of the head and neck.
    polygon.material_index = 0 if polygon.normal.y < 0.15 else 1
    if polygon.material_index == 1 and polygon.center.z > 0.55:
        polygon.material_index = 2
    if polygon.material_index == 0 and any(is_backdrop(uv.data[i].uv) for i in polygon.loop_indices):
        polygon.material_index = 2 if polygon.center.z > 0.35 else 1
    if polygon.center.z < -1.32:
        polygon.material_index = 2
    polygon.use_smooth = True

def project_uv(obj):
    layer = obj.data.uv_layers.new(name='InkProjection')
    for loop in obj.data.loops:
        point = world_to_camera_view(scene, projector, obj.data.vertices[loop.vertex_index].co)
        layer.data[loop.index].uv = (point.x, point.y)

# Trace the approved curl silhouette, including its asymmetric fringe/temples.
# Two lofted surfaces close into a volume; this is not a billboard or plane.
outline = [
    (635,39),(748,48),(854,74),(922,121),(967,180),(989,257),
    (994,332),(978,412),(950,479),(911,547),(878,575),
    (854,552),(836,497),(817,443),(792,410),(746,388),
    (696,378),(665,409),(646,401),(638,359),(616,376),
    (584,392),(548,386),(509,409),(469,417),(437,440),
    (416,484),(401,537),(393,572),(363,572),(330,532),
    (301,493),(284,440),(271,393),(261,345),(270,272),
    (298,202),(330,153),(378,112),(433,76),(494,55),(568,42),
]
contour = []
for index, point in enumerate(outline):
    following = outline[(index+1)%len(outline)]
    for step in range(5):
        t=step/5
        x=point[0]*(1-t)+following[0]*t
        y=point[1]*(1-t)+following[1]*t
        # Small scallops at the boundary read as individual curls.
        x += 2.8*math.sin((index*5+step)*2.1)
        y += 2.8*math.cos((index*5+step)*1.7)
        u,v=x/1280,1-y/1280
        # Follow the actual ink edge wherever the coarse trace crosses red.
        for _ in range(30):
            if not is_backdrop((u,v)):
                break
            u = 625/1280+(u-625/1280)*0.995
            v = (1-235/1280)+(v-(1-235/1280))*0.995
        contour.append((u,v))
verts, faces, hair_uvs = [], [], []
rings, cols = 24, len(contour)
center = (625/1280,1-235/1280)

def front_depth(x,z):
    # A single-valued cap: the same X/Z always has the same depth, including
    # the center. The former per-ray depth made a folded fan at the crown.
    q = max(0.12,1-(x/1.65)**2-((z-1.25)/1.8)**2)
    return -0.20-0.90*math.sqrt(q)

def hair_vertex(u,v,depth,texture_uv=None):
    verts.append(((u-0.5)*portrait_size,depth,(v-0.5)*portrait_size))
    hair_uvs.append(texture_uv or (u,v))
    return len(verts)-1

def join_rings(a,b):
    for i in range(cols):
        nxt=(i+1)%cols
        faces.append((a[i],a[nxt],b[nxt],b[i]))

boundaries=[]
for side in range(2):
    cx,cz=(center[0]-0.5)*portrait_size,(center[1]-0.5)*portrait_size
    pole=hair_vertex(*center,front_depth(cx,cz) if side==0 else 0.95,
                     center if side==0 else (0.5,0.82))
    previous=None
    for j in range(1,rings+1):
        radius=j/rings
        current=[]
        for u,v in contour:
            extent=radius*(1 if side==0 else 0.88)
            tex_u=center[0]+(u-center[0])*extent
            tex_v=center[1]+(v-center[1])*extent
            x,z=(tex_u-0.5)*portrait_size,(tex_v-0.5)*portrait_size
            depth=front_depth(x,z) if side==0 else 0.15+0.80*(1-radius*radius)
            texture_uv=(tex_u,tex_v) if side==0 else (0.5+(tex_u-0.5)*0.60,0.82+(tex_v-0.82)*0.35)
            current.append(hair_vertex(tex_u,tex_v,depth,texture_uv))
        if previous is None:
            for i in range(cols):
                faces.append((pole,current[i],current[(i+1)%cols]))
        else:
            join_rings(previous,current)
        previous=current
    boundaries.append(previous)

# Rounded side walls wrap the curls around the temples and crown. Intermediate
# rings avoid the old flat extruded strip and share the front/back rim vertices.
previous=boundaries[0]
for step in range(1,9):
    t=step/9
    current=[]
    for i,(u,v) in enumerate(contour):
        front=Vector(verts[boundaries[0][i]])
        back=Vector(verts[boundaries[1][i]])
        position=front.lerp(back,t)
        position.y -= 0.10*math.sin(math.pi*t)
        front_uv=Vector(hair_uvs[boundaries[0][i]])
        back_uv=Vector(hair_uvs[boundaries[1][i]])
        texture_uv=front_uv.lerp(back_uv,t)
        current.append(hair_vertex(0.5+position.x/portrait_size,0.5+position.z/portrait_size,position.y,tuple(texture_uv)))
    join_rings(previous,current)
    previous=current
join_rings(previous,boundaries[1])
mesh = bpy.data.meshes.new('Afro_volume')
mesh.from_pydata(verts, [], faces)
mesh.update()
hair = bpy.data.objects.new('Ryan_Engraved_Afro', mesh)
scene.collection.objects.link(hair)
hair.data.materials.append(portrait)
hair.data.materials.append(black)
project_uv(hair)
for loop in hair.data.loops:
    hair.data.uv_layers.active.data[loop.index].uv=hair_uvs[loop.vertex_index]
for p in mesh.polygons:
    p.use_smooth = True
    p.material_index = 0
bm=bmesh.new(); bm.from_mesh(mesh)
bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
bm.to_mesh(mesh); bm.free(); mesh.update()
edge_counts=Counter(tuple(sorted((polygon.vertices[i],polygon.vertices[(i+1)%len(polygon.vertices)])))
                    for polygon in mesh.polygons for i in range(len(polygon.vertices)))
geometry_report={
    'hairVertices':len(mesh.vertices),
    'hairFaces':len(mesh.polygons),
    'hairBoundaryOrNonManifoldEdges':sum(count!=2 for count in edge_counts.values()),
    'hairDegenerateFaces':sum(p.area<1e-9 for p in mesh.polygons),
    'frontalLayout':'unchanged portrait projection',
    'depthFrame':'aligned FaceBuilder illustration camera',
}
assert geometry_report['hairBoundaryOrNonManifoldEdges']==0, geometry_report
assert geometry_report['hairDegenerateFaces']==0, geometry_report
(folder/'geometry-validation.json').write_text(json.dumps(geometry_report,indent=2),encoding='utf-8')

# Independent width/depth profiles form the chest, deltoids and trapezius.
# The old circular lathe put the shoulders down at chest level.
profile = [
    (-2.26, 0.02, 0.02), (-2.23, 0.78, 0.46),
    (-2.07, 1.30, 0.65), (-1.83, 1.73, 0.74),
    (-1.66, 1.61, 0.70), (-1.51, 1.22, 0.64),
    (-1.37, 0.83, 0.59), (-1.28, 0.75, 0.54),
    (-1.21, 0.72, 0.53), (-1.20, 0.69, 0.51),
]
verts, faces = [], []
for j,(z,width,depth) in enumerate(profile):
    for i in range(97):
        t=i/96*math.tau
        # Lower the front collar slightly to follow the base of the throat.
        front = max(0, -math.sin(t))
        dip = 0.075 * front if j >= 8 else 0
        verts.append((math.cos(t)*width, math.sin(t)*depth+0.17, z-dip))
        if j < len(profile)-1 and i<96:
            a=j*97+i; b=a+97
            faces.append((a,a+1,b+1,b))
mesh=bpy.data.meshes.new('Shirt_bust')
mesh.from_pydata(verts,[],faces); mesh.update()
body=bpy.data.objects.new('Ryan_Ink_Shirt',mesh)
scene.collection.objects.link(body)
subdivision=body.modifiers.new('Soft_shoulder_profile','SUBSURF')
subdivision.levels=2
subdivision.render_levels=2
body.data.materials.append(portrait); body.data.materials.append(black)
project_uv(body)
for loop in body.data.loops:
    v=body.data.vertices[loop.vertex_index].co
    body.data.uv_layers.active.data[loop.index].uv=(0.5+v.x/portrait_size,0.5+v.z/portrait_size)
for p in mesh.polygons:
    p.use_smooth=True
    p.material_index=0 if p.normal.y < -0.12 else 1
    if any(is_backdrop(body.data.uv_layers.active.data[i].uv) for i in p.loop_indices):
        p.material_index=1

# Remove the reconstruction's lower shoulder patch where it meets the clothing.
# Blender edit mode updates every morph target consistently with these deletions.
for obj in bpy.context.selected_objects: obj.select_set(False)
face.select_set(True)
bpy.context.view_layer.objects.active=face
for vertex in face.data.vertices:
    # Keep the chin and jaw; remove the projected capture's rear neck/shoulders.
    vertex.select=(vertex.co.z < -1.29 or (vertex.co.z < -0.70 and vertex.co.y > -0.52))
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.delete(type='VERT')
bpy.ops.object.mode_set(mode='OBJECT')

# A tapered anatomical neck behind the jaw; front UVs continue the ink drawing.
verts, faces = [], []
neck_profile=[(-1.48,0.72,0.49),(-1.29,0.66,0.48),(-1.05,0.63,0.49),(-0.80,0.64,0.50),(-0.63,0.65,0.51)]
for j,(z,width,depth) in enumerate(neck_profile):
    for i in range(97):
        t=i/96*math.tau
        verts.append((math.cos(t)*width,0.04+math.sin(t)*depth,z))
        if j<len(neck_profile)-1 and i<96:
            a=j*97+i; b=a+97
            faces.append((a,a+1,b+1,b))
mesh=bpy.data.meshes.new('Anatomical_neck')
mesh.from_pydata(verts,[],faces); mesh.update()
neck=bpy.data.objects.new('Ryan_Engraved_Neck',mesh)
scene.collection.objects.link(neck)
neck.data.materials.append(portrait); neck.data.materials.append(paper)
layer=neck.data.uv_layers.new(name='Portrait')
for loop in mesh.loops:
    vertex=mesh.vertices[loop.vertex_index].co
    layer.data[loop.index].uv=(0.5+vertex.x/portrait_size,0.5+vertex.z/portrait_size)
for p in mesh.polygons:
    p.use_smooth=True
    p.material_index=0 if p.normal.y<0.1 else 1

root=bpy.data.objects.new('Ryan_FaceBuilder_Bust',None)
scene.collection.objects.link(root)
control=bpy.data.objects.new('Head_Control',None)
scene.collection.objects.link(control)
control.parent=root
control.location.z=-0.65
for obj in [face,hair,neck]:
    obj.parent=control
    obj.scale=(0.72,)*3
    obj.location=(0,0,0.95)
body.parent=root
body.scale=(0.72,)*3
body.location.z=0.3
root['source']='KeenTools FaceBuilder 2026.3.1 / IMG_7626'
root['style']='Aligned FaceBuilder depth and photo FACS with approved ink silhouette'

# Genuine FaceBuilder eyelid deformation, exported as a looping blink clip.
scene.render.fps=24
scene.frame_start=1; scene.frame_end=121
for key in face.data.shape_keys.key_blocks:
    if 'blink' in key.name.lower():
        for frame,value in [(1,0),(61,0),(64,1),(67,0),(121,0)]:
            key.value=value; key.keyframe_insert(data_path='value',frame=frame)
if face.data.shape_keys.animation_data:
    face.data.shape_keys.animation_data.action.name='Blink'
scene.frame_set(1)

for obj in bpy.context.selected_objects: obj.select_set(False)
for obj in [root,control,face,hair,body,neck]: obj.select_set(True)
bpy.context.view_layer.objects.active=face
bpy.ops.export_scene.gltf(filepath=str(project/'public/models/ryan-facebuilder-bust.glb'),export_format='GLB',use_selection=True,export_animations=True,export_morph=True,export_morph_normal=False,export_extras=True,export_yup=True,export_image_format='AUTO')
# Store the complete editable assembly and reference cameras.
bpy.ops.wm.save_as_mainfile(filepath=str(folder/'ryan-facebuilder-ink.blend'))
print('FACEBUILDER_EXPORT_OK',flush=True)
