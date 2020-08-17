## Motivation
This is a solo project for fulfilling the requirement of [COMP4431 Multimedia Computing](https://prog-crs.ust.hk/ugcourse/2019-20/COMP). In this project, we are told to extend our lab work and explore other image processing techniques. I have picked `Unsharp Masking` as my topic of investigation, as well as exploring some interesting application of using `Gausian blur`. For extra work, I have implemented the `Pencil Sketch` effect using similar technique.

---

## Description
#### Unsharp Masking
To explain what is unsharp masking, first you shouldn't take its name literally. Because unsharp masking is actually a post-process operation to ***SHARPEN*** your image. If you want to understand further about its implementation, there are already lots of great articles on the internet. I could list out some that I've used for my own references:
- :link:[Understanding Unsharp Mask](https://www.damiensymonds.net/tut_usm/) - Damien Symonds
- :link:[Official Unsharp Mask Documentation](https://docs.gimp.org/2.6/en/plug-in-unsharp-mask.html) - GIMP
- :link:[Sharpening: Unsharp Mask](https://www.cambridgeincolour.com/tutorials/unsharp-mask.htm) - Cambridge in Colour
The TL;DR version:
1. Create a mask by subtracting a (Gausian) blurred copy from the original image.
2. Add the mask on top of the (higher contrast) original image. 
3. You got the sharpened final image!
Noted that the mask you created at step 1 might have some negative values, which is totally normal. Because there will be some overshooting/undershooting values along the edges. This will compensate the medium-ranged luminance pixels, such that darker gray will be darker and lighter gray will be lighter. Such separation of contrasted values then gives an illusion to the viewer that the image is "sharpened". But in reality, it is nothing but a regional contrast filter on the edges. 

|      Original      | Unsharp Masking  |
| :----------------: | :--------------: |
| ![](/images/lena_orig.png) | ![](/images/lena_um.png) |

Initially I'd expect such filter could enhance the detail of a blurred image. But as I could observe from the following results, this doesn't do the work at all. Surely, it emphasizes the `contrast` along the edges. However, it can never reassemble the `lost features` on the edges. 

|   Blurred Image    |    Unsharp Masking    |
| :----------------: | :-------------------: |
| ![](/images/lena_blur.png) | ![](/images/lena_blur_um.png) |

---

#### Pencil Sketch
Since I saw artists on the internet often use the combination of Gausian blur and layer blending to "fake" a pencil sketch effect. I would like to try replicating it for a little extra project work. 
Here's a simplified procedure:
1. Prepare two grayscaled copies (A & B) of the original image. 
2. Invert the brightness of B.
3. Apply Gaussian blur on either A or B.
4. Layer B on top of A, and apply color dodge (and optionally combine them back to one image).
After the above modifications, you now should be able to experiment with different `radius` value in the blurring operation, and get your desired pencil sketch effect. :pencil:

|    Radius = 5    |    Radius = 20    |
| :--------------: | :---------------: |
| ![](/images/lena_ps.png) | ![](/images/lena_psh.png) |

---

## Tool Used
- Programming Language: Javascript
- Environment: VS Code