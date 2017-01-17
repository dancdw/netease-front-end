var page = (function(util) {
  var html2node = util.html2node,
      easyTpl = util.easyTpl,
      getElementsByClassName = util.getElementsByClassName,
  	  pageTpl = '<div class="m-paging">\
				  <div class="prev item" data-pageNo="{$prevPage}"></div>\
				  <ul></ul>\
				  <div class="next item" data-pageNo="{$nextPage}"></div>\
				</div>',
	    pageItemTpl = '<li data-pageNo="{$page}" class="{$itemClass}">{$page}</li>';


  return {
  	renderPage: renderPage
  }


  // 生成分页节点
  function renderPage(totalPage, pageIndex) {
    var pageIndex = pageIndex ? parseInt(pageIndex) : 1,
    	  prevPage = Math.max(pageIndex - 1, 1),
    	  nextPage = Math.min(pageIndex + 1, totalPage);

    // 分页容器
    pageContainer = html2node(easyTpl(pageTpl, {prevPage: prevPage, nextPage: nextPage}));
    
    // 生成分页每项
    renderPageItem(pageContainer, prevPage, pageIndex, totalPage);

    return pageContainer;
  }

  // 生成页
  function renderPageItem(pageContainer, prevPage, pageIndex, totalPage) {
    var startPages = pageIndex - 2 > 4 ? 4 : pageIndex - 2,
   	    middlePages = Math.min(prevPage + 3, totalPage),
        endPages = pageIndex + 3 > totalPage ? pageIndex + 3 : totalPage - 2,
        defClass = 'item',
        pageBelt = pageContainer.getElementsByTagName('ul')[0];// 分页传送带

  	for(var j = 1; j <= startPages; j++) {
      var itemClass = defClass,
      	  page = j;
      if(j == 4) {
      	page = '...';
      	itemClass = ' ';
      }
      var li = html2node(easyTpl(pageItemTpl, {page: page, itemClass:itemClass}));
      pageBelt.appendChild(li);
    }
      
    for(var i = prevPage; i <= middlePages; i++){
      var itemClass = defClass,
      	  itemClass = pageIndex == i ? 'active' : itemClass,
      	  li = html2node(easyTpl(pageItemTpl, {page:i, itemClass:itemClass}));
      pageBelt.appendChild(li);
    }

    for(var k = endPages; k <= totalPage; k++) {
      var itemClass = defClass,
      	  page = k;
      if(totalPage - k == 2) {
      	page = '...';
      	itemClass = ' ';
      }
      var li = html2node(easyTpl(pageItemTpl, {page: page, itemClass:itemClass}));
      pageBelt.appendChild(li);
    }
  }
})(util);