"""Reconstruct Ryan's head with the installed, licensed FaceBuilder add-on.

Run with Blender --background --python scripts/reconstruct-facebuilder.py.
This uses the add-on's normal loader, camera input, detector and solver.
It never substitutes a procedural head when reconstruction fails.
"""
from pathlib import Path
import json
import sys
import argparse
import bpy
import addon_utils

parser = argparse.ArgumentParser()
parser.add_argument('--reference', default='photo-reference-v3.png')
parser.add_argument('--name', default='ryan-facebuilder')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
project = Path(__file__).resolve().parents[1]
output = project / 'design' / 'avatar' / 'facebuilder'
output.mkdir(parents=True, exist_ok=True)
addon_utils.enable('keentools', default_set=True, persistent=True)
from keentools.addon_config import fb_settings, ProductType
from keentools.blender_independent_packages.pykeentools_loader import module
from keentools.common.license_checker import check_license
from keentools.facebuilder.fbloader import FBLoader
from keentools.facebuilder.head import MESH_OT_FBAddHead
from keentools.utils import attrs
from keentools.utils.images import load_rgba
from keentools.utils.coords import update_head_mesh_non_neutral
from keentools.utils.focal_length import configure_focal_mode_and_fixes

check_license(ProductType.FACEBUILDER)
print('FACEBUILDER_READY', flush=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
settings = fb_settings()
obj = MESH_OT_FBAddHead.new_head()
obj.name = 'Ryan_FaceBuilder_Head'
attrs.add_to_fb_collection(obj)
FBLoader.set_keentools_attributes(obj)
head = settings.heads.add()
head.headobj = obj
head.reset_sensor_size()
settings.current_headnum = settings.get_last_headnum()
headnum = settings.current_headnum
FBLoader.save_fb_serial_and_image_pathes(headnum)
camera = FBLoader.add_new_camera_with_image(headnum, str(project / 'design/avatar' / args.reference))
fb = FBLoader.get_builder()
fb.set_use_emotions(head.should_use_emotions())
kid = camera.get_keyframe()
configure_focal_mode_and_fixes(fb, head)
image = load_rgba(camera)
faces = fb.detect_faces(image, fb.pixel_aspect_ratio(kid))
print('DETECTED_FACES', len(faces), flush=True)
if len(faces) != 1:
    raise RuntimeError('Expected exactly one face; manual selection is required.')
if not fb.detect_face_pose(kid, faces[0]):
    raise RuntimeError('FaceBuilder could not align the face.')
fb.remove_pins(kid)
fb.add_preset_pins_and_solve(kid)
update_head_mesh_non_neutral(fb, head)
FBLoader.update_camera_pins_count(headnum, 0)
FBLoader.update_all_camera_positions(headnum)
FBLoader.update_all_camera_focals(headnum)
FBLoader.save_fb_serial_and_image_pathes(headnum)
bpy.context.scene.camera = camera.camobj
bpy.context.scene.render.resolution_x, bpy.context.scene.render.resolution_y = camera.cam_image.size
bpy.context.scene.render.resolution_percentage = 35
for polygon in obj.data.polygons:
    polygon.use_smooth = True
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(output / (args.name + '.blend')))
report = {'tool':'KeenTools FaceBuilder', 'reference':args.reference, 'stage':'aligned-head', 'vertices':len(obj.data.vertices), 'faces':len(obj.data.polygons), 'keyframe':kid}
(output / (args.name + '.json')).write_text(json.dumps(report, indent=2), encoding='utf-8')
print('FACEBUILDER_RECONSTRUCTION_OK', report, flush=True)
