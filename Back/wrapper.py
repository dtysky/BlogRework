# T_T coding=utf-8 T_T

"""
Converting metadata to slug.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "Wrapper"


from slug_wrappers import SlugWrapper
from get_sub_classes import get_all_classes


class Wrapper(object):
    """
    Converting metadata to slug.
    """

    def __init__(self):
        self._slug_wrappers = {}
        for c in get_all_classes(["slug_wrappers.py"], SlugWrapper):
            obj = c()
            self._slug_wrappers[obj.get_flag()] = obj

    def _slug_convert(self, metadata):
        tmp = dict(metadata)
        for wrapper_name, wrapper_obj in self._slug_wrappers.items():
            tmp[wrapper_name] = wrapper_obj.convert(metadata)
        return tmp

    def convert(self, metadata):
        return self._slug_convert(metadata)