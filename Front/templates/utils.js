'use strict';
/**
 * Created by dtysky on 16/2/3.
 */

module.exports = {
    has: function(list, element){
        return list.indexOf(element) > -1
    },
    errorHandler: function(res){
        res.status(404);
        res.end("Error!");
    },
    getListContent: function(json, index, articles_per_page){
        var data = JSON.parse(json);
        var content = data.content.sort(function(a, b){
            return a.date > b.date ? -1 : 1
        });
        return {
            view: data.view,
            max_index: parseInt(data.length / articles_per_page) + 1,
            data: content.slice(index * articles_per_page, (index + 1) * articles_per_page)
        }
    },
    getPageContent: function(json){
        var content = JSON.parse(json).content;
        return {
            authors: content.authors.map(function(author){
                return author.view
            }).join(","),
            keywords: content.tags.map(function(tag){
                return tag.view
            }).join(","),
            page: content
        }
    }
};