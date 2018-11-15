function reLoad(){
		location.reload();

}
function detailHide(){
	$('#info').hide();
}

		
		
$(document).ready(function(){
	$("#text").keyup(function(){
		$("#first_row").html('');
		var s=document.demo.keyword.value;
		$.ajax({
	            url         : "http://www.omdbapi.com/?apikey=5117874b&s="+s,
	            type        : "POST",
	            contentType : "application/json",
	            dataType    : "json",
	            processData : false,
	            cache       : false,       
           	}).done(function( msg ) {      			
           			for (var key in msg.Search){
			           $("#first_row").append(
			          		`
			           		<div class="col-md-3" style="margin-top: 20px; margin-bottom: 20px;">
			            		<div class="card" style="width: 16rem; margin-left: 25px;">
			            			<img id="poster" class="card-img-top" src="${msg.Search[key].Poster}" alt="Poster Not Found">
			            			<div class="card-body">
			            				<p class="card-text" style="padding: 25px" >${msg.Search[key].Title}(${msg.Search[key].Year})</p>
			            				<a href="#" onclick="movieInfo('${msg.Search[key].imdbID}');" class="btn btn-primary" id="detail">See Details</a>
			            			</div>
			            		</div>
			            	</div><br>
			            	`
			            );
	            	}
			});	

        $('#carouselExampleControls').hide();
        if(s==""){
           	$('#carouselExampleControls').show();
        }

        $('#list').show();
        $('#info').hide();

    });			
});

function movieInfo(i_url){
	$.ajax({
			url         : "http://www.omdbapi.com/?apikey=5117874b&plot=full&i="+i_url,
			type        : "POST",
			contentType : "application/json",
			dataType    : "json",
			processData : false,
			cache       : false,       
		}).done(function(data) {    
				// console.log(data.Poster);
				$("#title").html('');
				$("#title").append(data.Title+'('+data.Year+')');
				$("#info_poster").html('');
				$("#info_poster").attr("src", data.Poster);
				$("#type").html('');
				$("#type").append('['+data.Type+']');
				$("#rated").html('');
				$("#rated").append('['+data.Rated+']');
				$("#runtime").html('');
				$("#runtime").append('['+data.Runtime+']');
				$("#genre").html('');
				$("#genre").append('['+data.Genre+']');
				$("#released").html('');
				$("#released").append('['+data.Released+']');
				$("#plot").html('');
				$("#director").html('');
				$("#director").append("<b>Director:</b> "+data.Director);
				$("#actors").html('');
				$("#actors").append("<b>Actors:</b> "+data.Actors);
				$("#writer").html('');
				$("#writer").append("<b>Writer:</b> "+data.Writer);
				$("#imdbRating").html('');
				$("#imdbRating").append("<b>IMDB Rating:</b> "+data.imdbRating+"/10 ("+data.imdbVotes+" Votes)");
				
				$("#awards").html('');
				$("#awards").append("<b>Awards:</b> "+data.Awards);
				$("#plot").append(data.Plot);


				if(!data.BoxOffice){
					$("#boxoffice").html('');
					$("#boxoffice").append("<b>Box Office:</b> N/A");
				}
				else{
					$("#boxoffice").html('');
					$("#boxoffice").append("<b>Box Office:</b> "+data.BoxOffice);
				}

			});

	$('#list').hide();
	$('#info').show();
       

}
