"""Install the official KeenTools package into this portable Blender profile."""
from pathlib import Path
import bpy
import addon_utils

tools = Path(bpy.app.binary_path).parent.parent
bpy.ops.preferences.addon_install(filepath=str(tools / 'keentools.zip'))
addon_utils.enable('keentools', default_set=True, persistent=True)
from keentools.blender_independent_packages import pykeentools_loader as loader
if not loader.is_installed():
    loader.install_core_from_file(str(tools / 'keentools-core.zip'))
bpy.ops.wm.save_userpref()
print('FACEBUILDER_SETUP_OK', flush=True)
print('CORE_STATUS', loader.installation_status(), flush=True)
