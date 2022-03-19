// const res = require("express/lib/response");

function makeOverlay(map, position, content) {
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
    xAnchor: 0.6,
    yAnchor: 0.9,
  });
  customOverlay.setMap(map);
}

function makeMarker(map, latlng) {
  var imageSrc = "/assets/marker.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(32, 35), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(15, 60) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  var markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: latlng, // 마커의 위치
    image: markerImage,
  });

  return marker;
}
// used AJAX here cuz we need to get data from db after page loads
async function getCourseDetailsClient() {
  let courseId = document.getElementById("courseId").value;

  try {
    const response = await fetch(`/user/viewcourse/${courseId}/getDetails`);
    if (!response.ok) {
      alert("Fetching details failed!");
      return;
    }
    const responseData = await response.json();

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          responseData.list[0].latY,
          responseData.list[0].longX
        ), // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    let positions = [];
    for (let x = 0; x < responseData.list.length; x++) {
      let data = {
        content: `<div class="customoverlay"><a href="${
          responseData.list[x].placeUrl
        }" target="_blank"><h1>${x + 1} ${responseData.list[x].placeName}</h1>
       </a></div>`,
        latlng: new kakao.maps.LatLng(
          responseData.list[x].latY,
          responseData.list[x].longX
        ),
      };
      positions.push(data);
    }
    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      makeMarker(map, positions[i].latlng);
      makeOverlay(map, positions[i].latlng, positions[i].content);
    }
  } catch (error) {
    alert(error);
  }
}

async function deleteCourse() {
  try {
    let courseId = document.getElementById("courseId").value;
    let token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    const response = await fetch(`/user/viewcourse/${courseId}`, {
      credentials: "same-origin", // <-- includes cookies in the request
      headers: {
        "CSRF-Token": token, // <-- is the csrf token as a header
      },
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Deleting Course failed!");
    } else {
      const responseData = await response.json();
      let divMap = document.getElementById("map");

      divMap.replaceChildren();
      divMap.innerHTML = `<div class="flex justify-center items-center bg-blue-300 h-full w-full"><h1 class="text-4xl text-center font-bold text-white">${responseData.message}</h1></div>`;
    }
  } catch (error) {
    throw error;
  }
}

getCourseDetailsClient();
