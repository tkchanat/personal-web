## Motivation
One day I've been wandering on ShaderToy, and I came across a piece of work named [Heartfelt](https://www.shadertoy.com/view/tlVGWK). At first glance I knew I'm going to breakdown the code and learn something from it because this work really captures the essence of rain. But then I found out the name of **Martijin Steinrucken** (a.k.a. [The Art of Code](https://www.youtube.com/c/TheArtofCodeIsCool) from YouTube) was credited within the code. So I checked his YouTube channel and found a [tutorial](https://www.youtube.com/watch?v=EBrAdahFtuo) explaining in detail of how the shader works. And here we are, trying to create one myself by following his video. :umbrella:

---

## Development
I won't cover much here since Martijin is an awesome guy and you should check out his video if you want an in-depth explanation on how he models the raindrops. But I'll still briefly show you the idea behind the procedural generated raindrops using only mathematics tricks. 

### Dynamic Drops
| Moving grids /w perfectly-timed vertical movements | Shape distortion & horizontal movements | Trails /w UV coordinates | Apply as UV offsets |
| :------------: | :------------: | :------------: | :------------: |
| ![](/images/rd1.gif) | ![](/images/rd2.gif) | ![](/images/rd3.gif) | ![](/images/rd4.gif) |

### Static Drops
| Tiled UV using sin(x) /w noise distortion | Smoothstep(x) on the sum of RG channels | Smoothstep(x) on layered Perlin noise | Apply as mask |
| :------------: | :------------: | :------------: | :------------: |
| ![](/images/rd5.png) | ![](/images/rd6.png) | ![](/images/rd7.gif) | ![](/images/rd8.gif) |

### Composition
Layering two dynamic drops and one static drops and apply them as the UV offsets for sampling textures (either backgrounds or frame buffers) can compose the final effect as below.
![](/images/rd9.gif)
For a final touch, I've added a [vignette effect](https://www.shadertoy.com/view/lsKSWR) for the rainy day vibe. I even hand-picked this photo that I've taken on a rainy day at Melbourne city. :foggy:

## Exploration
We all knew straight up following others code wasn't cool, so I went experimenting some more variations with this shader. At least I don't like the idea of blatantly copying others work without contributing!

### Slope-aware Raindrops
I was thinking of apply this shader onto any kind of surfaces, both concave and convex, and the raindrops should slide off according to the surface slope. However after some digging, a guy named **Taizyd Korambayil** has done it before and of course he wrote [a blog](https://deepspacebanana.github.io/deepspacebanana.github.io/blog/shader/art/unreal%20engine/Rainy-Surface-Shader-Part-1) about it. Now that's cool, but he's using the `triplanar projection` method to achieve it. And I wonder if it's possible to render raindrops on surface procedurally.  

#### 1st Attempt - Rotated UV Coordinates
Since the shader above is based on the UV of the geometry, initially I was thinking a correct UV orientation would do the trick (i.e. if a cube is tilted 45 degree, the UV coordinates should be rotated accordingly). Needless to say, that's too naive to think it that way because obviously different geometries/meshes have **different UV mapping and topology**. So this approach immediately puts on a halt.

#### 2nd Attempt - World Position
Just for record, I once thought of using the fraction part of a scaled world coordinates as the reference grid for the raindrops. But we're not dealing with volumetric data, instead we need the surface information rather than its global position. Furthermore, using the XYZ-axis as the basis has no difference with the `triplanar projection` method, where we still get the weird overlapping artifacts around the non-axis alignign corners. Thus I concluded that's a no-go for me.

#### 3rd Attempt - Surface Tangents
How about utilizing the surface tangents you ask? We could calculate the downward vector on a given surface by some vector projection tricks using the global up vector, similar to the one used in the `Gram-Schmidt process`. That's the closest one I believe that might work! ...unless it doesn't :cry:
| Cube | Torus |
| :------------: | :------------: |
| ![](/images/rd10.gif) | ![](/images/rd11.gif) |

You see, the result on a cube is very promising. But for the torus...ughhhhh, it's not looking right. I have no idea why it won't work on concave surfaces. So I basically gave up at this point. Perhaps I'm too ambitious at the first place. But hey, I had fun learning something from it! :thumbsup:

---

## Tool Used
- Programming Language: HLSL
- Environment: [SHADERed](https://github.com/dfranx/SHADERed)