/* global google */
import { cities } from "./navigation.json";

// render the cities on the page
const renderNav = items => {
  const nav = document.getElementsByTagName("nav");
  const border = document.createElement("div");
  const ul = document.createElement("ul");
  border.classList.add("border");
  ul.classList.add("nav-bar");

  items.forEach(item => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = item.label;
    li.appendChild(link);
    ul.appendChild(li);
  });
  nav[0].appendChild(border);
  nav[0].appendChild(ul);
};

// add click positioning event to nav items
const borderCalculation = () => {
  const setNavItems = document.querySelectorAll(".nav-bar li a");
  const border = document.querySelector(".border");
  setNavItems[0].classList.add("active");

  setLocationTime(setNavItems[0]);
  positionRelativeItem(setNavItems[0], border);

  setNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const currentItem = document.getElementsByClassName("active");
      if (currentItem.length !== 0) {
        currentItem[0].classList.remove("active");
      }
      item.classList.add("active");
      setLocationTime(item);
      positionRelativeItem(item, border);
    });
  });
};

// position bottom border on resize of browser window
window.addEventListener("resize", () => {
  const currentItem = document.getElementsByClassName("active");
  const border = document.querySelector(".border");
  if (currentItem.length !== 0) {
    positionRelativeItem(currentItem[0], border);
  }
});

// sets the position of one item relative to the position of another item
const positionRelativeItem = (item, navTab) => {
  const itemSize = {
    width: item.getBoundingClientRect().width,
    height: item.getBoundingClientRect().height,
    left: item.getBoundingClientRect().left,
    bottom: item.getBoundingClientRect().top
  };

  Object.assign(navTab.style, {
    width: `${itemSize.width}px`,
    height: `${itemSize.height}px`,
    left: `${itemSize.left}px`,
    top: `${itemSize.bottom}px`,
    transform: "none"
  });
};

// this finds a lat, lng based on the selected city
const setLocationTime = item => {
  const timeBox = document.getElementsByClassName("time-container");
  const timeDiv = document.getElementsByClassName("time");
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: item.textContent }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      calculateTimeZone(
        results[0].geometry.location.lat(),
        results[0].geometry.location.lng()
      );
    } else {
      timeBox[0].styles.backgroundColor = "red";
      timeDiv[0].textContent = "Something went wrong: " + status;
    }
  });
};

// uses Google's Time Zone API to calculate the time zone based on the given lat/lng
// the api key used is heavily restricted, as it is a browser key and must be on the front end
const calculateTimeZone = (lat, lng) => {
  const timeDiv = document.getElementsByClassName("time");
  const currentDate = new Date();
  const timestamp =
    currentDate.getTime() / 1000 + currentDate.getTimezoneOffset() * 60;
  const loc = lat + "," + lng;
  const url =
    "https://maps.googleapis.com/maps/api/timezone/json?location=" +
    loc +
    "&timestamp=" +
    timestamp +
    "&key=YOUR_OWN_API_KEY_HERE";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === "OK") {
        const currentDate = new Date();
        const currentTime = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          dayPeriod: "short",
          timeZone: data.timeZoneId
        }).format(currentDate);

        timeDiv[0].textContent = currentTime;
      } else {
        timeDiv[0].textContent = "Something went wrong: " + data.status;
      }
    });
};

renderNav(cities);
borderCalculation();
