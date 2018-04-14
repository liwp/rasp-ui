RASP To Do List
===

In no particular order…

- move the current location to a google map button (can we just use the GM UI?)
- introduce multiple overlay options - star rating first
- change the bwd/fwd buttons so that they rotate the day as well?
- render the date or stop cycling from last day to first day
- change images to `http://` to avoid using our proxy
- work out if we can fix sizing on mobile (https://www.creativebloq.com/html5/12-html5-tricks-mobile-81412803)
- go-to UI with BGA turn point DB
- remove header and place time / loading indicator somewhere else to save space
- fix current GOTO functionality (req for `transparent.png` fails)

# Done

## Icons

We're using `react-icons` to access FontAwesome icons. The promise is that we
end up 'paying' only for the icons that we use.

- use icons


## Image preload

My `preload` requests get cancelled. My theory is that the page finishes
rendering, Chrome realises that the preloaded images are not references anywhere
on the page, and the requests are cancelled.

- use react-helmet to manage the `<head>` links (https://github.com/nfl/react-helmet)
- add preload links to `<head>` for the noon images of all seven days (https://css-tricks.com/prefetching-preloading-prebrowsing/#article-header-id-5)
- add prefetch links to `<head>` for the other times of all seven days (starting from the closest day) (https://css-tricks.com/prefetching-preloading-prebrowsing/#article-header-id-2)
- add prefetch links to `<head>` for all other overlays for the non-updraft images
