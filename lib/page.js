var page = (function(util) {
  var html2node = util.html2node,
      easyTpl = util.easyTpl,
      getElementsByClassName = util.getElementsByClassName,
  	  pageTpl = '<div class="m-paging">\
				  <div class="prev item" data-pageNo="{$prevPage}"></div>\
				  <ul></ul>\
				  <div class="next item" data-pageNo="{$nextPage}"></div>\
				</div>',
	    pageItemTpl = '<li data-pageNo="{$page}" class="{$itemClass}">{$page}</li>',
      MIDDLELEN = 3,
      LEFTLEN = 3;


  return {
    // 生成分页节点
  	renderPage: function(totalPage, pageIndex) {
      var pageIndex = pageIndex ? parseInt(pageIndex) : 1,
          prevPage = Math.max(pageIndex - 1, 1),
          nextPage = Math.min(pageIndex + 1, totalPage);

      // 分页容器
      pageContainer = html2node(easyTpl(pageTpl, {prevPage: prevPage, nextPage: nextPage}));
      
      // 生成分页每项
      renderPageItem(pageContainer, prevPage, pageIndex, totalPage);

      return pageContainer;
    }
  }

  // 生成页
  function renderPageItem(pageContainer, prevPage, pageIndex, totalPage) {
    var defClass = 'item',
        pageBelt = pageContainer.getElementsByTagName('ul')[0], // 分页传送带
        minddleStart = prevPage > totalPage - MIDDLELEN ? Math.max(totalPage - MIDDLELEN, 1) : prevPage, // prevPage = pageIndex - 1
        minddleEnd = prevPage + MIDDLELEN > totalPage ? totalPage : prevPage + MIDDLELEN,
        leftEnd = pageIndex - 2 > LEFTLEN ? LEFTLEN : pageIndex - 2,
        rightStart = pageIndex + 3 > totalPage - 2 ? pageIndex + 3 : totalPage - 2;
    
    if(totalPage > 4) { // 总页数大于4页显示省略页码 如： 1 2 ... 
      for(var j = 1; j <= leftEnd; j++) {
        var itemClass = defClass,
           page = j;
        if(j == LEFTLEN) {
         page = '...';
         itemClass = ' ';
        }
        var li = html2node(easyTpl(pageItemTpl, {page: page, itemClass:itemClass}));
        pageBelt.appendChild(li);
      }
    }

    for(var i = minddleStart; i <= minddleEnd; i++) {
      var itemClass = defClass,
          itemClass = pageIndex == i ? 'active' : itemClass,
          li = html2node(easyTpl(pageItemTpl, {page:i, itemClass:itemClass}));
      pageBelt.appendChild(li);
    }

    if(totalPage > 4) { // 总页数大于4页显示省略页码 如： ... 8 9
      for(var k = rightStart; k <= totalPage; k++) {
        var itemClass = defClass,
           page = k;
        if(totalPage % k == 2 && (rightStart > pageIndex + 3)) { 
         page = '...';
         itemClass = ' ';
        }
        var li = html2node(easyTpl(pageItemTpl, {page: page, itemClass:itemClass}));
        pageBelt.appendChild(li);
      }
    }
  }
})(util);