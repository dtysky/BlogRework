# T_T coding=utf-8 T_T

"""
Writing data to database.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "Writer"


from database_writers import DatabaseWriter
from get_sub_classes import get_all_classes


class Wrapper(object):
    """
    Writing data to database.
    """

    def __init__(self):
        self._database_writers = {}
        for c in get_all_classes(["database_writers.py"], DatabaseWriter):
            obj = c()
            self._database_writers[obj.get_flag()] = obj

    def _get_old_page(self):
        pass

    def _database_write(self, metadata):
        pass

    def write(self, metadata):
        pass