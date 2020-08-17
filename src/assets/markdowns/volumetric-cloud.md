## Motivation
Despite it is a project for fulfilling the course requirement of [COMP5411 Advanced Computer Graphics](https://www.cse.ust.hk/pg/courses/#COMP5411), I took it as a challenge and implemented it within a week. The main initiatives are trying out `ray marching techniques` while learning `WebGL`.
Most features are referencing [Fredrik's work](https://pdfs.semanticscholar.org/89e9/153a091889c584df034a953a0eff4de45ee9.pdf), including the height and density altering functions. The cloud shapes are carved out using 3d worley and perlin noises as suggested in [Guerrilla's slides](http://advances.realtimerendering.com/s2015/The%20Real-time%20Volumetric%20Cloudscapes%20of%20Horizon%20-%20Zero%20Dawn%20-%20ARTR.pdf) in SIGGRAPH 2015. Most work was done by me, except the noise generation and the sky shader from three.js demo.

---

## Development
#### Day 1
![](/images/vc1.png) Since this is my first time of doing graphics on a browser, I wanted to test out the feasibility and get myself comfortable using such environment. So I tried to construct a semi-transparent 3D scalar field and ray marched through the volume. The result that I got is as expected, a semi-transparent cube, suspended in mid-air. The only early optimization that I can throw in is to terminate the ray marching when the cumulated opacity hits one. ~~Surely, no significant improvement at all.~~ A ghostly cube may not seem like much, but everything will come together when the volume is initialized with the right configurations.
#### Day 2
|      Red       |     Green      |      Blue      |     Alpha      |
| :------------: | :------------: | :------------: | :------------: |
| ![](/images/vc2_r.png) | ![](/images/vc2_g.png) | ![](/images/vc2_b.png) | ![](/images/vc2_a.png) |
Next, we need some information describing how our sky looks. And according to the method suggested in both the talk and paper, it can be achieved by encoding the cloud distribution in a RGBA texture called `Weather Map`. The red and green channels represent a `low-coverage` and `high-coverage` cloud distribution respectively. The blue channel represents the `maximum height` (altitude) the cloudscape can reach. The alpha channel represents the `maximum density` of the cloud distribution. With these information packed into a single texture, we could store the data in the GPU and query it efficiently during the shading stage. 
To give more controls to the cloud distribution, a slider will be given for interpolating between the low and high coverage map. We then sample the interpolated value in each ray marching step to determine if a cloud is formed there. The maximum height map is basically a vertical mask introducing variations so that it's more visually natural. 
So far the overall cloud distribution was modeled nicely. However, the resolution looks very bad since the 3D volume was essentially stretched across the sky. Therefore, we need to add some `noise` to further shape the cloudscape in detail.
![](/images/vc2.png)

#### Day 3
|      Red       |     Green      |      Blue      |     Alpha      |
| :------------: | :------------: | :------------: | :------------: |
| ![](/images/vc3_r.png) | ![](/images/vc3_g.png) | ![](/images/vc3_b.png) | ![](/images/vc3_a.png) |
Generating noise maps is time-consuming and definitely needed to be done offline, so I generated a raw 3D texture data during initialization and save it as a binary file. But for the sake of demonstration, the above illustrations are extracted from Fredrik's paper. It is a RGBA 128x128x128 3D texture consisting four noise maps. In the red channel, a `FBM` (Fractal Brownian Motion) noise is generated using `Perlin` noise alone. For the rest, are also FBM noises but a combination of `Perlin and Worley` noise with progressive frequencies. (**Note:** 3D texture sampling wasn't supported in WebGL1, that's the reason why WebGL2 is required for this to work)
Here we are following the aesthetic of nature, the beauty of fractals, to add in layers of details to our fluffy clouds. Tiling the combined result of our noise maps and multiply with our weather map, the shape of a cloud begins to take place. For sanity check, the cloud distribution slider also worked as expected. It's satifying to watch the cloudscape spans across the sky.
![](/images/vc3.png)

#### Day 4
Now the basic geometry was done, it's time for some lighting work! To approximate the real physics going on inside a cloud, the light ray is needed to be traced back to the light source (sun) in each sample point to evaluate the amount of light that can be reached. However, iterating through each ray march steps and lighting steps could result in a squared complexity. I found that 2-3 lighting steps is enough for the minimum visual representation. More than that could result in severe performance drop (i.e. <30FPS on a 1080 display). 
`Beer's law` is used to calculate the attenuation value at each sample point. Here the density map in our weather map comes to play, as the law relies on the mediums properties. With the specified light color, the clouds are shaded correctly to the color we want.
![](/images/vc4.png)

#### Day 5
Until now, I'm using a skybox as the background but that doesn't reflect the sun position and light direction. Luckily, three.js has an example code on a fully functional sky dome with dynamic lightings. Thus I shamelessly applied it in order to save my time. 
Extending from the previous work, the only adjustment needed to be done is to match our light color with the new sky color. Rather than extracting the sky color from the three.js example shader, I prefer hardcode the transition colors for artistic reason. 
Everything are now globally lit according to the sun position, yet something feels ... \"off\" in some sense. It's because the `silver-lining effect` is missing. See, normally clouds directly in-front of the sun would have a brighter outline as light shines behind it and reached our eyes. Therefore, the `Henyey-Greenstein's phase function` is augmented to our shading equation. It takes the in/out and isotropic scattering into accounts, and of course the light angle between the light direction and camera ray direction. 
![](/images/vc5.png) Now not only the cloud's outline looks better, but also you can easily tell where the sun is located even if it's occluded. Overall, the work is done here even though there're lots of optimization work could be done to run on lower specification devices. For example, the motion vector approach mentioned in the paper wasn't implemented here, and early termination in ray marching as to alleviate the average performance. 

#### Extra
![](/images/vc6.png)
I've added a terrain model just for filling the emptiness. And you're able to navigate the enrionment using \"Minecraft-style\" controls. To tackle more on the banding effect caused by ray marching, a `blue noise` texture was applied to offset individual rays. 
Make sure to try out the [demo](https://tkchanat.github.io/webgl-volumetric-cloud/) if your browser supports WebGL2 (Google Chrome is recommended). Try to tweak on the parameters and observe the changes. :cloud::sunny::sunglasses:

---

## Tool Used
- Programming Language: Javascript, WebGL2
- Library Used: [three.js](https://threejs.org/), [tooloud.js](https://github.com/jackunion/tooloud), [dat.gui.js](https://github.com/dataarts/dat.gui), [stats.js](https://github.com/mrdoob/stats.js/)
- Environment: Visual Studio Code, Google Chrome