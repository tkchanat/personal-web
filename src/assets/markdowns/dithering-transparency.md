## Motivation
![](/images/dither_motiv.png)
Don't you just hate when the camera clipping through geometries when you're in a free camera or an arcball camera? Being able to look through objects can sometimes take away the immersive experience of the viewer. Especially in games, players will identify something was wrong or even thinking they're "glitching" the game. But what if your camera is intented to go through objects? Are there methods to smoothly transition from opaque surfaces to the background?

### Alpha Blending
Some would say enabling alpha testing supported by the rendering API could potentially work. The idea is to lower the surface alpha value based on the distance to the viewing camera. Then it may appears to be fading from the approaching camera. 
![](/images/painters.jpg)
That's true until you are working with overlapping geometries. And according to the `Painter's Algorithm`, which is a way to sort all transparent objects and paint them individually from back to front, it's impossible to identify which part of the geometry is being overlapped or not (demonstrated by the above image). Hence becoming difficult to render them properly without being bothered by the artifacts. So, we need a smarter way to blend multiple opaque objects together (at least visually).

---

## Development
| Original | Ordered | Error-Diffusion |
| :------: | :-----: | :-------------: |
| ![](/images/dither_orig.png) | ![](/images/dither_order.png) | ![](/images/dither_error.png) |
![](/images/bayer_matrix.png)

`Dithering`, a method often used by graphics engineerers to trick your eyes. By interlacing the pixels in a specific pattern, your brain will basically treat them as a normal gradient. The above image is using an `ordered dithering` algorithm using a `Bayer matrix`. Of course there're different kind of algorithms, like `error-diffusion dithering` which gives an even smoother transitions between color values. But for the sake of performance, `ordered dithering` has the least computation complexity. 

### Idea
First we have to convert the screen space to pixel coordinates by multiplying it by the viewport resolution. Then using a modulo operator on both x and y axis to slice up the canvas. For each `4x4` pixel area, apply the `Bayer matrix` to calculate the threshold value for that pixel position. Here's what the matrix looks like:
$\begin{bmatrix}
  0  & 8  & 2  & 10 \\
  12 & 4  & 14 & 6  \\
  3  & 11 & 1  & 9  \\
  15 & 7  & 13 & 5
\end{bmatrix}$

For this implementation, we will be incrementing all elements by 1 and divide them by 17. Since we would like to have 17 shades of gray (i.e. all black&white + 15 aternating dot patterns), the division here is very crucial. After that, we will `discard` all the pixels that are having an alpha value lower than its corresponding threshold value. 

#### Shader Graph
![](/images/dither_graph.png)
Finally, hooking up the alpha value by the distance from the surface's world position to the camera. Setting a fade distance parameter can limit the activition range of the dithering effect. 

And there you have it! I'm thinking of combining this effect with the Schrödinger's cat:cat2: would be a cool demonstration. Now a conscious being can finally observe a quantum object without clipping through reality! :thumbsup::thumbsup:

### Result
![](/images/dither.gif)