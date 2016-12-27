var channelName = 'TechGuyWeb';
$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyB0POj3nVi1ZtUP_ZXdrX2Jyo_UXstoAGI'
        },
        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            });
        }
    );
    
    function getVids(){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 50,
                playlistId: pid,
                key: 'AIzaSyB0POj3nVi1ZtUP_ZXdrX2Jyo_UXstoAGI'
            },
            function(data){
                var output;
                $.each(data.items, function(i, item){
                    console.log(item);
                    videoTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    output = '<li><iframe src=\"//www.youtube.com/embed/'+videoId+'\"></iframe></li>';
                    
                    $('#result').append(output);
                    
                });
            }
        );
    }
});
