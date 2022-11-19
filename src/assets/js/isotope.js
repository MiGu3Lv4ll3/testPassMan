// external js: isotope.pkgd.js

// quick search regex
var qsRegex
var iso
// init Isotope
function initIsotope(){
  iso = new Isotope( '.isotope-items', {
    itemSelector: '.isotope-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.card-title',
      category: '.card-category'
    },
    filter: function( itemElem ) {
      const searchResult = qsRegex ? itemElem.textContent.match(qsRegex) : true;
      return searchResult;
    }
  });
}

var quicksearch = document.querySelector('#searchBox')
var filtersElem = document.querySelector('.filters-button-group');
// filter functions
// var filterFns = {
//   // show if number is greater than 50
//   numberGreaterThan50: function( itemElem ) {
//     var number = itemElem.querySelector('.number').textContent;
//     return parseInt( number, 10 ) > 50;
//   },
//   // show if name ends with -ium
//   ium: function( itemElem ) {
//     var name = itemElem.querySelector('.name').textContent;
//     return name.match( /ium$/ );
//   }
// };

// bind filter button click
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  // var isButton = event.target.classList.contains('custom-btn');
  // if ( !isButton ) {
  //   return;
  // }

  var filterValue = ""
  event.target.getAttribute('filter')=="*"
  ?filterValue = event.target.getAttribute('filter')
  :filterValue = "."+event.target.getAttribute('filter');
  // use matching filter function
  // filterValue = filterFns[ filterValue ] || filterValue;
  iso.arrange({ filter: filterValue });
});


// QUICK SEACH 

// use value of search field to filter
quicksearch.addEventListener('focus', resetallFilters)

quicksearch.addEventListener( 'keyup', debounce(function() {
  qsRegex = new RegExp( quicksearch.value, 'gi' );
  iso.arrange({
    filter: function (itemElem) {
      // console.log("called the filter option on the isoGrid, qsRegex =", qsRegex);
      let searchResult = qsRegex ? itemElem.querySelector('.card-title').innerText.match(qsRegex) : true
      return searchResult
    }
  });
}, 200));

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}

// Sort By 

// bind sort button click
var sortByGroup = document.querySelector('.sort-by-button-group');
sortByGroup.addEventListener( 'click', function( event ) {
  // only button clicks
  var isButton = event.target.classList.contains('custom-btn');
  if ( !isButton ) {
    return;
  }

  var sortValue = event.target.getAttribute('data-sort-value');
  iso.arrange({ sortBy: sortValue });
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0; i < buttonGroups.length; i++ ) {
  buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
}

function onButtonGroupClick( event ) {
  // only button clicks
  var isButton = event.target.classList.contains('custom-btn');
  if ( !isButton ) {
    return;
  }
  var button = event.target;
  button.parentNode.querySelector('.is-checked').classList.remove('is-checked');
  button.classList.add('is-checked');
}

function resetallFilters(event){
  let filters = document.querySelector('.filters-button-group')
  
  resetIsCheckedBtns(filters)
  // Re-arrange the isotope
  iso.arrange({
    filter: ""
  });
}

function checkShowAllBtnStatus(btn) {
  console.log(btn.classList);
  btn.classList.add("is-checked");
}

function resetIsCheckedBtns(el) {
  "use strict";
  let btnShowAll = document.querySelector('.show-all')
  // check if the element, that contains the filter buttons, has children
  if (el.getElementsByClassName("is-checked")) {
    var checked = el.getElementsByClassName(
      "custom-btn btn-category filter is-checked"
    );

    while (checked.length > 0) {
      checked[0].classList.remove("is-checked");
    }
    
    checkShowAllBtnStatus(btnShowAll)
  }
}

function reloadIsotope(){
  if (iso) {
    console.log("Reiniciando Isotope!!");
    iso.destroy()
  }
  initIsotope()
}

window.onload = ()=>{
  console.log("Reiniciando Isotope!! onload");
  initIsotope()
}