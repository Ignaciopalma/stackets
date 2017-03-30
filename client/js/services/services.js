angular.module('stackets.services', [])
  .factory('Snippets', function ($http) {
    var data;
    var tags;
    var languages;

    var addSnippet = function (snippet) {
      return $http({
        method: 'POST',
        url: '/api/snippets',
        data: JSON.stringify(snippet)
      });
    };

    var getAllSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets',
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getRecentSnippets = function () {
      return $http({
        method: 'GET',
        url: '/api/snippets/recent',
        data: {
          limit: 1
        }
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getAllTags = function () {
      return $http({
        method: 'GET',
        url: '/api/tags',
      }).then(function (resp) {
        tags = resp.data;
        return tags;
      });
    };

    var getAllLanguages = function () {
      return $http({
        method: 'GET',
        url: '/api/languages',
      }).then(function (resp) {
        languages = resp.data;
        return languages;
      });
    };

    var getSnippetById = function (id) {
      return $http({
        method: 'GET',
        url: '/api/snippets/' + id
      }).then(function (resp) {
        data = resp.data;
        return data;
      });
    };

    var getFavsBySnippet = function (data) {
      return $http({
        method: 'GET',
        url: '/api/getFavsBySnippet/' +  data.snippetId,
        data: data
      }).then(function (response) {
        return response;
      });
    };

    var isFavSnippetByUser = function (data) {
      return $http({
        method: 'GET',
        url: '/api/isFavSnippetByUser/' +  data.snippetId + '/' + data.userId,
        data: data
      }).then(function (response) {
        return response;
      });
    };

    var toggleFavorite = function (data) {
      return $http({
        method: 'POST',
        url: '/api/favorite',
        data: data
      });
    };

    return {
      addSnippet: addSnippet,
      getAllSnippets: getAllSnippets,
      getAllTags: getAllTags,
      getAllLanguages: getAllLanguages,
      getRecentSnippets: getRecentSnippets,
      getSnippetById: getSnippetById,
      data: data,
      toggleFavorite: toggleFavorite,
      isFavSnippetByUser: isFavSnippetByUser,
      getFavsBySnippet: getFavsBySnippet
    };
  });
