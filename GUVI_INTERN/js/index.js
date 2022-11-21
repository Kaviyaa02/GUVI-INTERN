
  $.ajax({
    type: "GET",
    url: "./php/redis.php",
    encode: true,
  }).done(function (e) {
    count.innerHTML = e;
    console.log(e);
  });
