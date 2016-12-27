/**
 * http://benalman.com/code/projects/jquery-resize/examples/resize/
 * 页面引入组件：
 * https://raw.githubusercontent.com/cowboy/jquery-resize/v1.1/jquery.ba-resize.min.js
 */
$(function(){
  // Append an iFrame to the page.
  var iframe = $('<iframe src="./child/" scrolling="no"/>').insertAfter('#iframe-info');
  
  // Called once the Iframe's content is loaded.
  iframe.load(function(){
    // The Iframe's child page BODY element.
    var iframe_content = iframe.contents().find('body');
    
    // Bind the resize event. When the iframe's size changes, update its height as
    // well as the corresponding info div.
    iframe_content.resize(function(){
      var elem = $(this);
      
      // Resize the IFrame.
      iframe.css({ height: elem.outerHeight( true ) });
      
      // Update the info div width and height.
      $('#iframe-info').text( 'IFRAME width: ' + elem.width() + ', height: ' + elem.height() );
    });
    
    // Resize the Iframe and update the info div immediately.
    iframe_content.resize();
  });
});