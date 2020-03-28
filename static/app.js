function videos(
  divId,
  publishedAt,
  channelTitle,
  title,
  videoId,
  description,
  tags = null
) {
  itemDiv = document.createElement("div");
  itemDiv.setAttribute("class", "item");

  spanDate = document.createElement("span");
  spanDate.setAttribute("class", "pull-right");
  spanDate.innerText = publishedAt;
  itemDiv.append(spanDate);
  itemDiv.append(document.createElement("br"));

  spanChannelTitle = document.createElement("span");
  spanChannelTitle.setAttribute("class", "pull-right");
  spanChannelTitle.innerText = channelTitle;
  itemDiv.append(spanChannelTitle);

  videoTitle = document.createElement("h2");
  videoTitle.setAttribute("class", "text-primary");
  videoTitle.innerText = title;
  itemDiv.append(videoTitle);

  iframeDiv = document.createElement("iframe");
  iframeDiv.setAttribute("class", "video w100");
  iframeDiv.setAttribute("width", "100%");
  iframeDiv.setAttribute("height", "400");
  iframeDiv.setAttribute("frameborder", 0);
  iframeDiv.setAttribute("allowfullscreen", true);
  iframeDiv.setAttribute("src", "//www.youtube.com/embed/" + videoId);
  itemDiv.append(iframeDiv);

  desc = document.createElement("h3");
  desc.innerText = "Description";
  itemDiv.append(desc);

  descText = document.createElement("p");
  descText.innerText = description;
  itemDiv.append(descText);

  if (tags != null) {
    tagData = document.createElement("ul");
    $.each(tags, function(index, tag) {
      tags = document.createElement("li");
      tags.setAttribute("id", index);
      tags.innerText = tag;

      tagData.append(tags);
    });
    itemDiv.append(tagData);
  }
  itemDiv.append(document.createElement("hr"));

  if (divId === "result-title") {
    $("#result-title").append(itemDiv);
  } else {
    $("#result-id").append(itemDiv);
  }
}

$(function() {
  $("#by-title").on("submit", function(e) {
    $("#result-title").empty();
    e.preventDefault();
    $.ajax({
      url: "http://localhost:5000/youtube/title/" + $("#search-title").val(),
      type: "GET",
      success: function(results) {
        $.each(results.items, function(index, item) {
          videos(
            "result-title",
            item.snippet.publishedAt,
            item.snippet.channelTitle,
            item.snippet.title,
            item.id.videoId,
            item.snippet.description
          );
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});

$(function() {
  $("#by-id").on("submit", function(e) {
    $("#result-id").empty();
    e.preventDefault();
    $.ajax({
      url: "http://localhost:5000/youtube/id/" + $("#search-id").val(),
      type: "GET",
      success: function(results) {
        $.each(results.items, function(index, item) {
          videos(
            "result-id",
            item.snippet.publishedAt,
            item.snippet.channelTitle,
            item.snippet.title,
            $("#search-id").val(),
            item.snippet.description,
            item.snippet.tags
          );
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
