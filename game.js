$('.btn').on('click', function(event) {
    let source_path = './sounds/' + this.getAttribute('id') + '.mp3';
    new Audio(source_path).play();
});