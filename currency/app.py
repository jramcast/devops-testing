from currencies import repository
from currencies import server


app = server.start(repository)
