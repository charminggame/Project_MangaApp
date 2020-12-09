function detail(N) {
    var C = 0;
    var db = firebase.firestore();
    db.collection("manga").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var number = `${doc.data().N}`
                var card = ` <img src="${doc.data().Poster}" width="100%">
                    <B>${doc.data().Name}</B>
                    <p>
                        ${doc.data().Detail}
                    </p>
                    <button type="button" class="btn btn-danger" onclick="Addremove(${doc.data().N})">
                    <div class="row">
                      &nbsp&nbsp
                    <ons-icon icon="md-favorite" size="40px"></ons-icon>
                    <h2>&nbspFavorite&nbsp&nbsp</h2>
                    </div>
                    </button>
                    `;
                    if(Number(N) === Number(number)){
                      $("#D").append(card);
                    }
            });
        })
  }