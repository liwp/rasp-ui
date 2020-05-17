RASP To Do List
===

Urgent:

- iPhone PWA is broken
- http vs https

In no particular order…

- add layers
- go-to UI with BGA turn point DB
- remove header and place time / loading indicator somewhere else to save space (some animated fade-in/out label?)


## Image loading

My `preload` requests get cancelled. My theory is that the page finishes
rendering, Chrome realises that the preloaded images are not references anywhere
on the page, and the requests are cancelled.

- use react-helmet to manage the `<head>` links (https://github.com/nfl/react-helmet)
- add preload links to `<head>` for the noon images of all seven days (https://css-tricks.com/prefetching-preloading-prebrowsing/#article-header-id-5)
- add prefetch links to `<head>` for the other times of all seven days (starting from the closest day) (https://css-tricks.com/prefetching-preloading-prebrowsing/#article-header-id-2)
- add prefetch links to `<head>` for all other overlays for the non-updraft images

I have good news! I managed to implement a hacky preload by simply instantiating
JS `Image()` objects with the appropriate URL. We now preload **all** images
starting from the noon image for all days, followed by the other hours for each
day starting from the first day.

The URL had already been changed to use the RASP backend rather than my https
proxy:

- change images to `http://` to avoid using our proxy


## Layout

It seems like the current Mobile Safari `100vh` behaviour (where the chrome
hides some of the page content) is intentional, so I won't be trying to fix this
at this moment. The workaround for me personally is to use Chrome.

- work out if we can fix sizing on mobile (https://www.creativebloq.com/html5/12-html5-tricks-mobile-81412803)
