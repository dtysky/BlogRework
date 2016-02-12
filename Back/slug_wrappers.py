# T_T coding=utf-8 T_T

"""
Classes for convert metadata to slug.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "SlugWrapper"


from urllib import quote as url_encode
from datetime import datetime
from utils import convert_to_underline


class SlugWrapper(object):
    """
    Parent class for parsing meta data.
    """

    def __init__(self):
        pass

    def get_flag(self):
        return convert_to_underline(
            self.__class__.__name__.replace('Wrapper', '')
        )

    def convert(self, metadata):
        flag = self.get_flag()
        return {
            "name": metadata[flag],
            "slug": url_encode(metadata[flag])
        }


class TitleWrapper(SlugWrapper):
    """
    Parsing "tag" metadata.
    """

    def convert(self, metadata):
        category = metadata["category"]
        date = datetime.strptime(metadata["date"], "%Y.%m.%d %H:%M")
        return {
            "name": metadata["title"],
            "slug": url_encode(
                "%s-%s" %
                (category, date.strftime("%Y-%m-%d-%H-%M"))
            )
        }


class TagsWrapper(SlugWrapper):
    """
    Parsing "tag" metadata.
    """

    def convert(self, metadata):
        return [
            {
                "name": tag,
                "slug": url_encode(tag)
            }
            for tag in metadata["tags"]
        ]


class AuthorsWrapper(SlugWrapper):
    """
    Parsing "author" metadata.
    """

    def convert(self, metadata):
        return [
            {
                "name": author,
                "slug": url_encode(author)
            }
            for author in metadata["authors"]
        ]


class CategoryWrapper(SlugWrapper):
    """
    Parsing "category" metadata.
    Only one category can one article have.
    """
    pass