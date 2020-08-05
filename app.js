$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'3e821dd7b79c9a456009',
                client_secret:'d0a701c20fec3a9e77d80c82adfea75ccbb40022'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'3e821dd7b79c9a456009',
                    client_secret:'d0a701c20fec3a9e77d80c82adfea75ccbb40022',
                    sort: 'created: asc',
                    per_page: 5,
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                  $('#repos').append(`
                    <div class="card">
                      <div class="row">
                        <div class="col-md-6 ml-2 mt-3">
                          <strong>${repo.name}</strong>: ${repo.description}
                        </div>
                        <div class="col-md-3 ml-2 mt-3">
                          <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                          <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                          <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                        </div>
                        <div class="col-md-2 p-2 ml-3">
                          <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                        </div>
                      </div>
                    </div>
                  `);
                });
            })
            $('#profile').html(
                `
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ${user.name}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img width="100%" height="80%" src="${user.avatar_url}" class="thumbnail" />
                                <a target="_blank" class="btn btn-primary btn-block my-3" href="${user.html_url}">
                                    View ${user.name} profile
                                </a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge badge-success">Public repos: ${user.public_repos}</span>                                
                                <span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-info">Followers: ${user.followers}</span>
                                <span class="badge badge-primary">Following: ${user.following}</span>
                                <br><br>
                                
                                <ul class="list-group">
                                    <li class="list-group-item bg-white active m-1" style="font-weight:400;color:black;">
                                        Email: ${user.email}
                                    </li>
                                    <li class="list-group-item bg-white active m-1" style="font-weight:400;color:black;">
                                        Website: ${user.blog}
                                    </li>
                                    <li class="list-group-item bg-white active m-1" style="font-weight:400;color:black;">
                                        Location: ${user.location}
                                    </li>
                                    <li class="list-group-item bg-white active m-1" style="font-weight:400;color:black;">
                                        Member Since: ${user.created_at}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">${user.name}'s Latest Repos</h3>
                <div id="repos"></div>
                `
            )
        })
    })
});