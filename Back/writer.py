# T_T coding=utf-8 T_T

"""
Writing data to database.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "Writer"


from copy import deepcopy as copy
from database_writers import DatabaseWriter
from get_sub_classes import get_all_classes


class Writer(object):
    """
    Writing data to database.
    """

    def __init__(self, database):
        self._database = database
        self._articles = database.get_collection("article")
        self._database_writers = {}
        for c in get_all_classes(["database_writers.py"], DatabaseWriter):
            obj = c(database)
            self._database_writers[obj.get_flag()] = obj
        self._file_path = ""

    def _get_old_page(self, file_path):
        result = self._articles.find_one(
            {
                "file": file_path
            }
        )
        content = result["content"]
        del result["content"], result["_id"]
        return {
            "metadata": result,
            "content": content
        }

    def _insert(self, page):
        for writer_name, writer_obj in self._database_writers.items():
            print page["metadata"]
            writer_obj.insert(copy(page))

    def _update(self, file_path, page):
        old_page = self._get_old_page(file_path)
        for writer_name, writer_obj in self._database_writers.items():
            writer_obj.update(copy(page), copy(old_page))

    def _delete(self, file_path):
        page = self._get_old_page(file_path)
        for writer_name, writer_obj in self._database_writers.items():
            writer_obj.delete(copy(page))

    def write(self, file_path, mode="delete", page=None):
        self._file_path = file_path
        if mode != "delete" and page == None:
            self._error("Mode is not 'delete', argument 'page' is required !")
        if mode == "update":
            if self._articles.find_one(
                {
                    "file": file_path
                }
            ):
                print "Update !"
                self._update(file_path, page)
            else:
                print "Insert !"
                self._insert(page)
        elif mode == "delete":
            self._delete(file_path)
        else:
            self._error("Unexpected mode '%s' !" % mode)

    def _error(self, message):
        print message
        print "File: ", self._file_path
        raise