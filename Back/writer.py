# T_T coding=utf-8 T_T

"""
Writing data to database.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "Writer"


from database_writers import DatabaseWriter
from get_sub_classes import get_all_classes


class Writer(object):
    """
    Writing data to database.
    """

    def __init__(self, database):
        self._database = database
        self._articles = database.get_database("articles")
        self._database_writers = {}
        for c in get_all_classes(["database_writers.py"], DatabaseWriter):
            obj = c(database)
            self._database_writers[obj.get_flag()] = obj

    def _get_old_page(self, file_path):
        return self._articles.find_one(
            {
                "file": file_path
            }
        )

    def _insert(self, page):
        for writer_name, writer_obj in self._database_writers:
            writer_obj.insert(page)

    def _update(self, file_path, page):
        for writer_name, writer_obj in self._database_writers:
            writer_obj.update(page, self._get_old_page(file_path))

    def _delete(self, file_path):
        for writer_name, writer_obj in self._database_writers:
            writer_obj.delete(self._get_old_page(file_path))

    def write(self, file_path, mode="delete", page=None):
        if mode != "delete" and page == None:
            self._error("Mode is not 'delete', argument 'page' is required !")
        if mode == "insert":
            self._insert(page)
        elif mode == "update":
            self._update(file_path, page)
        elif mode == "delete":
            self._delete(file_path)
        else:
            self._error("Unexpected mode '%s' !" % mode)

    def _error(self, message):
        print message
        raise