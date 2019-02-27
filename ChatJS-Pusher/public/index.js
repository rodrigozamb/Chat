
$(document).ready(function(){    
    var pusher = new Pusher('f6c6db1f0d26cf3f73ba', {
        cluster: 'us2',
        encrypted: false
    });
    let channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    const node = document.querySelector('#message');

    node.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const message = $("#message").val();
            $("#message").val("");
            //send message
            $.post( "http://localhost:5000/message", { message } );
        }
    });

    $('#btn-chat').click(function(){
        const message = $("#message").val();
        $("#message").val("");
        //send message
        $.post( "http://localhost:5000/message", { message } );
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);
        $(".chat").append(template);
    }
});