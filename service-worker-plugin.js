self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            self.clients.matchAll()
                .then(function(clients){
                    if (clients && clients.length) {
                        clients.forEach(function (client) {
                            // 这样发出去，sw-register.js 就能收的到啦
                            client.postMessage('sw.update');
                        })
                    }
                })
        ])
    );
});