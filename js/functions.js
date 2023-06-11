// Adding array functions


Array.prototype.inArray = function (variable) {
  for (var i = 0; i < this.length; i++) {
    if (variable(this[i])) return true;
  }
  return false;
};
Array.prototype.pushIfNotExist = function (element, variable) {
  if (!this.inArray(variable)) {
    this.push(element);
  }
};

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}


//get website data from json files

checkMobile = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};


isMobile = checkMobile();



var appData = new Vue({
  el: '#appwrap',
  data: {
    navActive: false,
    eventSection: [],
    ticketsSection: [],
    introSection: [],
    isPageLoaded: false,
    DatesSection: [],
    convDates: [],
    logos: [],
    aboutSection: {
      "abouttext": "."
    },
    speakersSection: [],
    videosSection: [],
    allViedoTags: [],
    allViedoTagsActive: [],
    allViedoYears: [],
    activeTag: '',
    activeYear: 2023,
    sortBy: 'videoLength',
    isModalActive: false,
    modalData: {}
  },
  computed: {
    ordered: function () {
      return this.videosSection;
    },
    allViedoTagsActiveState: function () {
      return this.allViedoTagsActive;
    }
  },
  methods: {
    getTime: function (mins) {
      return "width:" + ((mins.split(":")[0] * 60 + mins.split(":")[1]) / 3600) + "%;";
    },
    filterVideos: function (tag) {
      // If tag isnt active, activate it, othrewise disable it
      if (this.allViedoTagsActive.indexOf(tag) !== -1) {
        this.allViedoTagsActive.splice(this.allViedoTagsActive.indexOf(tag), 1);
      } else {
        this.allViedoTagsActive.push(tag);
      }
    },
    isTagActive: function (tag) {
      // Return active state of the tag
      return (this.allViedoTagsActive.indexOf(tag) !== -1)
    },
    filterYear: function (year) {
      // Change current year filter
      this.activeYear = year;
    },
    isTagPresent: function (tagsArr) {
      // Check if all marked tags (allActiveTags) are present in current video arr tag given (tagsArr)
      let allActiveTags = this.allViedoTagsActive;

      // If there is no filter active
      if (allActiveTags.length == 0) {
        return true;
      } else {

        // check for any of the active filters...
        let tagCount = 0;
        for (let i = 0; i < allActiveTags.length; i++) {
          if (tagsArr.indexOf(allActiveTags[i]) !== -1) {
            tagCount++;
          }
          if (allActiveTags.length == tagCount) {
            return true;
          }
        }
        return false;
      }
    },
    isYear: function (year) {
      // Check if the current given video is from the selected year (if there is a selected year) 
      if (year !== "") {
        return year == this.activeYear;
      } else {
        return true;
      }


    },
    scrollModalToTop: function () {
      // Scroll the modal to top on setup

      $('.modal-right').animate({
        scrollTop: 0
      }, 100);


    }
  },
  created: function () {

    // Get all website data from STRAPI
    var _this = this;
    var converter = new showdown.Converter();


    
        for (var i = 0; i < allEvents.length; i++) {
          allEvents[i].isOpen = false;
          allEvents[i].content = converter.makeHtml(allEvents[i].content);
          allEvents[i].authorBio = converter.makeHtml(allEvents[i].authorBio);
          allEvents[i].authorSocial = converter.makeHtml(allEvents[i].authorSocial);
          if (!allEvents[i].authorImage) {
            allEvents[i].authorImage = '';
          }
          if (!allEvents[i].image) {
            allEvents[i].image = {
              url: ""
            }
          }
          if (_this.eventSection.filter(function (e) {
              return e.title === allEvents[i].eventParent;
            }).length > 0) {
            for (var j = 0; j < _this.eventSection.length; j++) {
              if (_this.eventSection[j].title == allEvents[i].eventParent) {
                _this.eventSection[j].eventCollection.push(allEvents[i]);
              }
            }
          } else {
            _this.eventSection.push({
              "title": allEvents[i].eventParent,
              "eventCollection": [allEvents[i]]
            });

          }
        }

        // Sort eventSection by title
          _this.eventSection.sort(function(a, b) {
            return parseInt(a.title.match(/\((.*)\)/).pop()) - parseInt(b.title.match(/\((.*)\)/).pop());
          });

        // Sort events by hour
        for (var k = 0; k < _this.eventSection.length; k++) {

          // remove parenthathees
          _this.eventSection[k].title = _this.eventSection[k].title.replace(/ *\([^)]*\) */g, "");
          
          // sort
          _this.eventSection[k].eventCollection.sort(dynamicSort("hour"));
        }


   // Load Videos
        _this.videosSection = allvideos;

        for (var i = 0; i < _this.videosSection.length; i++) {
          // Split video tags by commas
          _this.videosSection[i].videoTags = _this.videosSection[i].videoTags.split(",");

          for (let b = 0; b < _this.videosSection[i].videoTags.length; b++) {

            // Remove spaces
            while (_this.videosSection[i].videoTags[b].charAt(0) === ' ') {
              _this.videosSection[i].videoTags[b] = _this.videosSection[i].videoTags[b].substr(1);
            }
          }
          
        }
        for (var i = 0; i < _this.videosSection.length; i++) {

          // Push current video year to sorting arr
          _this.allViedoYears.pushIfNotExist(_this.videosSection[i].videoYear, function (e) { return e === _this.videosSection[i].videoYear });
          for (var j = 0; j < _this.videosSection[i].videoTags.length; j++) {

            // push tags from current video to sorting array
            _this.allViedoTags.pushIfNotExist(_this.videosSection[i].videoTags[j], function (e) {return e === _this.videosSection[i].videoTags[j]});
          }
        }

        // sort year tags by year
        _this.allViedoYears.sort();
        _this.allViedoYears.reverse();

        // sort all topics tags by A-Z
        _this.allViedoTags.sort();


        // console.log("tickets:");
        // console.log(data);
        _this.ticketsSection = tickettype;


    $.ajax({
      url: '/Logos',
      method: 'GET',
      success: (data) => {
        _this.logos = data;
      }
    });


  
        _this.convDates = importantdates;



        _this.introSection = {};
        // Push all keys in Introkeys to vue object
        for (var i = 0; i < introkeys.length; i++) {
          _this.introSection[introkeys[i].key] = introkeys[i].val;

        }

        // Check for isSubmitions state
        if (_this.introSection.isSubmitions == "false") {
          _this.introSection.isSubmitions = false
          console.log('isSubmitions is off');
        } else {
          $('#datesData').hide();
          $('#ticketsData').hide();
          $('#eventsData').hide();
          $('#SpeakersData').hide();
          $('.hide-on-cfs').hide();
          _this.introSection.isSubmitions = true;
          console.log('isSubmitions is true!');
        }
 
        for (var i = 0; i < aboutsection.length; i++) {
          _this.aboutSection[aboutsection[i].key] = converter.makeHtml(aboutsection[i].val);
        }
  }
});

getAllData();

function getAllData() {



}

// Do on document ready
var finishMapinitialAnimation = false;

// if using safari
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {}

$(window).resize(function () {
  // Change height for map object
  windowHeigth = $(window).height() / 2;
});




// scroll to links (for navigation)
$(".scrollToLink").click(function () {
  $([document.documentElement, document.body]).animate({
    scrollTop: $('#' + $(this).attr('scrolltarget')).offset().top + 40
  }, 500, function () {
    scrollNow();
  });
});


// color changes on scroll
var windowHeigth = $(window).height() / 2;



function scrollNow() {
  var currScroll = $(window).scrollTop() + (windowHeigth / 2);
  var lastScroll = $(".section:first");
  var prevScroll;

  $(".section").each(function () {
    if (isElementOnScreen($(this).attr('id'))) {
      lastScroll = $(this);
    }
  });

  if (prevScroll != lastScroll) {
    // add relevant class
    $("body").removeClass();
    $("body").addClass(lastScroll.attr('styleClass'));

    if (currcoord[0] !== 0 && finishMapinitialAnimation) {
      if (!isMobile) {
        map.flyTo({
          pitch: lastScroll.attr('map-pitch')
        });
      }
      map.setPaintProperty("shenkar-route", 'line-color', lastScroll.attr('line-color'));

    }


    // change prevscroll
    prevScroll = lastScroll;
  }
}

$(window).scroll(function () {
  scrollNow();
});


function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < (window.innerHeight / 2) && bounds.bottom > 0;
}
