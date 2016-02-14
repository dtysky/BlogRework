# T_T coding=utf-8 T_T

"""
Classes for convert metadata to slug.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "SlugWrapper"


import os
from urllib import quote as url_encode
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

    def wrap(self, metadata):
        flag = self.get_flag()
        return {
            "view": metadata[flag],
            "slug": url_encode(metadata[flag])
        }


class TitleWrapper(SlugWrapper):
    """
    Converting "title" metadata.
    """

    def wrap(self, metadata):
        category = metadata["category"]
        file_name = os.path.basename(metadata["file"]).split(".")[0]
        return {
            "view": metadata["title"],
            "slug": url_encode(
                "%s-%s" %
                (category, file_name)
            )
        }


class TagsWrapper(SlugWrapper):
    """
    Converting "tags" metadata.
    """

    def wrap(self, metadata):
        return [
            {
                "view": tag,
                "slug": url_encode(tag)
            }
            for tag in metadata["tags"]
        ]


class AuthorsWrapper(SlugWrapper):
    """
    Converting "authors" metadata.
    """

    def wrap(self, metadata):
        return [
            {
                "view": author,
                "slug": url_encode(author)
            }
            for author in metadata["authors"]
        ]


class CategoryWrapper(SlugWrapper):
    """
    Converting "category" metadata.
    Only one category can one article have.
    """
    pass