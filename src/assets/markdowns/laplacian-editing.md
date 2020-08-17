## Description
This is a programming work for a post-graduate course - [COMP5411 Advanced Computer Graphics](https://www.cse.ust.hk/pg/courses/#COMP5411). The application stores geometries using the `half edge data structure`. With the help of such data structure, both Laplacian smoothing and naïve Laplacian deformation/editing can be applied in almost real-time.

---

#### Laplacian Smoothing
|    Original     |  5th Iteration   |  20th Iteration  |
| :-------------: | :--------------: | :--------------: |
| ![](/images/acg_ls.png) | ![](/images/acg_ls1.png) | ![](/images/acg_ls2.png) |
For Laplacian smoothing, both `uniform weighting` and `cotangent weighting` are implemented to compare and observe the effects in vertex drifting. See more in this [lecture slide](http://graphics.stanford.edu/courses/cs468-12-spring/LectureSlides/06_smoothing.pdf) from Stanford University.

---

#### Laplacian Deformation
|    Original     | 1st Deformation  | 2nd Deformation  |
| :-------------: | :--------------: | :--------------: |
| ![](/images/acg_le.png) | ![](/images/acg_le1.png) | ![](/images/acg_le2.png) |
For Laplacian deformation, control points are manually selected (in purple) for constructing a `precomputed weight matrix`. Then only the position of constraints are updated in the editing phase. Noted that this naïve approach only account for vertex position but not orientation. This is an implementation of the paper [Laplacian Surface Editing](https://igl.ethz.ch/projects/Laplacian-mesh-processing/Laplacian-mesh-editing/index.php) published by Interactive Geometry Lab.

---

## Tool Used
- Programming Language: C++
- Environment: Xcode