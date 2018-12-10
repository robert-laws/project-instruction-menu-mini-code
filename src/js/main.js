function showDetails(element) {
  // var currentNodeClass = element.parentNode.getAttribute('class');
  // var detailsNode = document.getElementsByClassName(currentNodeClass).item(0).nextElementSibling;

  var detailsNode = element.parentNode.parentNode.getElementsByTagName('div').item(element.parentNode.parentNode.getElementsByTagName('div').length - 1);  

  if (detailsNode.getAttribute('style')) {
    detailsNode.removeAttribute('style');
  } else {
    detailsNode.setAttribute('style', 'display: block');
  }  
}