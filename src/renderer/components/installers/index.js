import AnacondaDescription from './anaconda/Description'
import AnacondaInstall from './anaconda/Install'
import AnacondaUninstall from './anaconda/Uninstall'

import HomebrewDescription from './homebrew/Description'
import HomebrewInstall from './homebrew/Install'
import HomebrewUninstall from './homebrew/Uninstall'

import PyenvDescription from './pyenv/Description'
import PyenvInstall from './pyenv/Install'
import PyenvUninstall from './pyenv/Uninstall'

import PipenvDescription from './pipenv/Description'
import PipenvInstall from './pipenv/Install'
import PipenvUninstall from './pipenv/Uninstall'

import ActivePythonDescription from './activepython/Description'
import ActivePythonInstall from './activepython/Install'
import ActivePythonUninstall from './activepython/Uninstall'

import CanopyDescription from './canopy/Description'
import CanopyInstall from './canopy/Install'
import CanopyUninstall from './canopy/Uninstall'

import MinicondaDescription from './miniconda/Description'
import MinicondaInstall from './miniconda/Install'
import MinicondaUninstall from './miniconda/Uninstall'

import PythonorgDescription from './pythonorg/Description'
import PythonorgInstall from './pythonorg/Install'
import PythonorgUninstall from './pythonorg/Uninstall'

import WinpythonDescription from './winpython/Description'
import WinpythonInstall from './winpython/Install'
import WinpythonUninstall from './winpython/Uninstall'

import PythonxyDescription from './xy/Description'
import PythonxyInstall from './xy/Install'
import PythonxyUninstall from './xy/Uninstall'

export default {
  anaconda: {
    name: 'Anaconda',
    note: '',
    url: 'https://www.continuum.io/',
    Description: AnacondaDescription,
    Install: AnacondaInstall,
    Uninstall: AnacondaUninstall
  },
  homebrew: {
    name: 'Homebrew',
    note: '',
    url: 'https://brew.sh/',
    Description: HomebrewDescription,
    Install: HomebrewInstall,
    Uninstall: HomebrewUninstall
  },
  pyenv: {
    name: 'pyenv',
    note: '',
    url: 'https://github.com/pyenv/pyenv',
    Description: PyenvDescription,
    Install: PyenvInstall,
    Uninstall: PyenvUninstall
  },
  pipenv: {
    name: 'pipenv',
    note: '',
    url: 'https://docs.pipenv.org/',
    Description: PipenvDescription,
    Install: PipenvInstall,
    Uninstall: PipenvUninstall
  },
  activepython: {
    name: 'ActivePython',
    note: '',
    url: 'https://www.activestate.com/activepython/downloads/',
    Description: ActivePythonDescription,
    Install: ActivePythonInstall,
    Uninstall: ActivePythonUninstall
  },
  canopy: {
    name: 'Enthought Canopy',
    note: '',
    url: 'https://enthought.com/product/canopy/',
    Description: CanopyDescription,
    Install: CanopyInstall,
    Uninstall: CanopyUninstall
  },
  miniconda: {
    name: 'Miniconda',
    note: '',
    url: 'https://conda.io/miniconda.html',
    Description: MinicondaDescription,
    Install: MinicondaInstall,
    Uninstall: MinicondaUninstall
  },
  pythonorg: {
    name: 'Python.org',
    note: '',
    url: 'https://www.python.org/',
    Description: PythonorgDescription,
    Install: PythonorgInstall,
    Uninstall: PythonorgUninstall
  },
  winpython: {
    name: 'WinPython',
    note: '',
    url: 'https://winpython.github.io/',
    Description: WinpythonDescription,
    Install: WinpythonInstall,
    Uninstall: WinpythonUninstall
  },
  xy: {
    name: 'Python(x,y)',
    note: '',
    url: 'https://python-xy.github.io/',
    Description: PythonxyDescription,
    Install: PythonxyInstall,
    Uninstall: PythonxyUninstall
  }
}
