# T_T coding=utf-8 T_T

"""
Classes for writing data to database.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "DatabaseWriters"


from utils import convert_to_underline


class DatabaseWriter(object):
    """
    Parent class for writing data.
    """

    def __init__(self, database):
        flag = self.get_flag()
        if flag not in database.collection_names():
            self._error("No collection named '%s' in database !" % flag)
        self._collection = database.get_collection(flag)

    def _arg_is_list(self):
        return False

    def get_flag(self):
        return convert_to_underline(
            self.__class__.__name__.replace('Database', '')
        )

    def get_slug_key(self):
        return "title"

    def _format_page(self, page):
        key = self.get_slug_key()
        tmp = page["metadata"]
        tmp["slug"] = tmp["title"]["slug"]
        if not self._arg_is_list():
            result = tmp
            result["name"] = result[key]["slug"]
            return result
        result = []
        for e in page["metadata"][key]:
            tmp["name"] = e["slug"]
            result.append(tmp)
        return result

    def insert(self, new_page):
        if not self._arg_is_list():
            self._collection.insert_one(
                self._format_page(new_page)
            )
            return
        for page in self._format_page(new_page):
            self._collection.insert_one(page)

    def update(self, new_page, old_page):
        if not self._arg_is_list():
            page = self._format_page(new_page)
            self._collection.replace_one(
                {
                    "name": page["name"],
                    "slug": page["slug"]
                },
                page
            )
            return
        new_pages, old_pages = self._format_page(new_page), self._format_page(old_page)
        for page in new_pages:
            if page in old_pages:
                self._collection.replace_one(
                    {
                        "name": page["name"],
                        "slug": page["slug"]
                    },
                    page
                )
            else:
                self._collection.insert_one(page)
        for page in old_page:
            if page not in new_pages:
                self._collection.delete_one(
                    {
                        "name": page["name"],
                        "slug": page["slug"]
                    }
                )

    def delete(self, old_page):
        if self._arg_is_list():
            page = self._format_page(old_page)
            self._collection.delete_one(
                {
                    "name": page["name"],
                    "slug": page["slug"]
                }
            )
            return
        for page in self._format_page(old_page):
            self._collection.delete_one(
                {
                    "name": page["name"],
                    "slug": page["slug"]
                }
            )

    def _error(self, message):
        print message
        raise


class ArticleWriter(DatabaseWriter):
    """
    Writing "article" collection.
    """

    def _format_page(self, page):
        result = page["metadata"]
        result["content"] = page["content"]
        result["name"] = result[self.get_flag()]["slug"]
        result["slug"] = result["title"]["slug"]
        return result


class ArchivesWriter(DatabaseWriter):
    """
    Writing "archives" collection.
    """

    pass


class TagWriter(DatabaseWriter):
    """
    Writing "tag" collection.
    """

    def get_slug_key(self):
        return "tags"

    def _arg_is_list(self):
        return True


class AuthorWriter(DatabaseWriter):
    """
    Writing "author" collection.
    """

    def get_slug_key(self):
        return "authors"

    def _arg_is_list(self):
        return True


class CategoryWriter(DatabaseWriter):
    """
    Writing "category" collection.
    Only one category can one article have.
    """

    def get_slug_key(self):
        return "category"


class WriterWithCount(object):

    def _new(self, item):
        self._collection.insert_one(
            {
                "view": item["view"],
                "slug": item["slug"],
                "count": 0
            }
        )

    def _inc(self, item):
        if not self._collection.find_one(
                {
                    "slug": item["slug"]
                }
            ):
                self._new(item)
        self._collection.update_one(
            {
                "slug": item["slug"]
            },
            {
                "$inc": {
                    "count": 1
                }
            }
        )

    def _dec(self, item):
        self._collection.update_one(
            {
                "slug": item["slug"]
            },
            {
                "$inc": {
                    "count": -1
                }
            }
        )
        if self._collection.find_one(
            {
                "slug": item["slug"]
            }
        )["count"] == 0:
            self._collection.delete_one(
                {
                    "slug": item["slug"]
                }
            )

    def insert(self, new_page):
        key = self._get_slug_key()
        for item in new_page[key]:
            self._inc(item)

    def update(self, new_page, old_page):
        key = self._get_slug_key()
        new_items, old_items = new_page[key], old_page[key]
        for item in new_items:
            if item not in old_items:
                self._inc(item)
        for item in old_items:
            if item not in new_page:
                self._dec(item)

    def delete(self, old_page):
        key = self._get_slug_key()
        for item in old_page[key]:
            self._dec(item)



class TagsWriter(WriterWithCount, DatabaseWriter):
    """
    Writing "tags" collection.
    """

    def get_slug_key(self):
        return "tags"


class AuthorsWriter(WriterWithCount, DatabaseWriter):
    """
    Writing "authors" collection.
    """

    def get_slug_key(self):
        return "authors"