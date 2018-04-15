RASP To Do List
===

In no particular order…

- introduce multiple overlay options - star rating first
- work out if we can fix sizing on mobile (https://www.creativebloq.com/html5/12-html5-tricks-mobile-81412803)
- go-to UI with BGA turn point DB
- remove header and place time / loading indicator somewhere else to save space

# Done

## Map controls

Looks like the GMaps API doesn't allow us to display a Home button. So I think
we'll just drop this feature. Probably best just to implement the BGA turnpoint
thingy.

Instead of fixing the `Home` button I just removed it.

- enable zoom controls
- disable fullscreen control (it removes our toolbar)
- render the date (or stop cycling from last day to first day)
- move the current location to a google map button (can we just use the GM UI?)
- fix current GOTO functionality (req for `transparent.png` fails)


## Icons

We're using `react-icons` to access FontAwesome icons. The promise is that we
end up 'paying' only for the icons that we use.

- use icons


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


## Navigation

The time bwd/fwd buttons now rolls backwards/forward to the previous/next day,
so you can rolls through all images by just clicking on the fwd (or bwd) button.

We also changed the `today` button to navigate to the current hour when it's
past noon.
