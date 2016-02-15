# T_T coding=utf-8 T_T

"""
Classes for handling http requests.
"""

__author__ = "Tianyu Dai (dtysky)"
__email__ = "dtysky@outlook.com"
__name__ = "WebHandler"


from flask.views import MethodView
from json import dumps as to_json
from utils import convert_to_underline
from utils import logger


class WebHandler(MethodView):
    """
    Parent class for handling http requests.
    """

    def __init__(self, database):
        self._database = database
        self._collection = None

    @property
    def flag(self):
        return convert_to_underline(
            self.__class__.__name__.replace('Handler', '')
        )

    @property
    def url(self):
        return "/%s" % self.flag

    @property
    def collection_name(self):
        return self.flag

    def _get_collection(self):
        collection_name = self.collection_name
        if collection_name not in self._database.collection_names():
            self._error("No collection named '%s' in database !" % collection_name)
        self._collection = self._database.get_collection(collection_name)

    def _find_data(self, parameters):
        return list(self._collection.find(
            {},
            {"_id": 0}
        ))

    def _parse_parameters(self, parameters):
        return parameters

    def _format_data(self, data):
        return to_json(data)

    def _handle(self, parameters=None):
        logger.info("Web, Request: %s\nParameters: %s" % (
            self.url, parameters
        ))
        if not self._collection:
            self._get_collection()
        data = self._find_data(
            self._parse_parameters(parameters)
        )
        if not data:
            return self._404(parameters)
        logger.info("Web, Data found: %s\nParameters: %s" % (
            self.url, parameters
        ))
        return self._format_data(data)

    def get(self, parameters):
        return self._handle(parameters)

    def _404(self, parameters):
        logger.info("Web, 404: %s\nParameters: %s" % (
            self.url, parameters
        ))
        return "Error", 404

    def _error(self, message):
        line = "Web: %s" % message
        logger.error(line)
        raise


class ArchivesHandler(WebHandler):
    """
    Handling "archives" request.
    """

    pass


class TagsHandler(WebHandler):
    """
    Handling "tags" request.
    """

    pass


class AuthorsHandler(WebHandler):
    """
    Handling "authors" request.
    """

    pass


class HandlerWithOneParameter(object):
    """
    A special class for handling request which has one parameter.
    """

    def _get_parameter_name(self):
        return "name"

    def _find_data(self, parameter=None):
        return list(self._collection.find(
            {
                self._get_parameter_name(): parameter
            },
            {"_id": 0}
        ))


class TagHandler(HandlerWithOneParameter, WebHandler):
    """
    Handling "tag" request.
    """

    pass


class AuthorHandler(HandlerWithOneParameter, WebHandler):
    """
    Handling "author" request.
    """

    pass


class CategoryHandler(HandlerWithOneParameter, WebHandler):
    """
    Handling "category" request.
    Only one category can one article have.
    """

    pass


class ArticleHandler(WebHandler):
    """
    Handling "article" request.
    """

    def _get_parameter_name(self):
        return "name"

    def _find_data(self, parameter=None):
        return self._collection.find(
            {
                self._get_parameter_name(): parameter
            },
            {"_id": 0}
        )