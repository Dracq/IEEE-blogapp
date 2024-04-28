import express from "express";
import { Blog } from "../models/blog.js";
import ErrorHandler from "../middlewares/error.js";

export const newPost = async (req, res, next) => {
  try {
    const { title, description,comments } = req.body;
    const blog = await Blog.create({
      title,
      description, 
      creator:req.user._id,
      comments
    });
    res.status(201).json({
      success: true,
      message: "blog added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    next(error);
  }
}

export const updatePost =async (req, res, next) =>{
  try {
    const { title, description } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    res.status(200).json({
      success: true,
      message: "blog updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const addComment=async (req, res,next) => {
  try {
    // const blog = await Blog.findByIdAndUpdate(req.params.id, {
    //   $push: {
    //     comment: req.body,
    //     commentorId:req.user._id
    //   },
    // });

    const blog=await Blog.findById(req.params.id);
    const{comment}=req.body
    blog.comments.push({commentorId:req.user._id, comment:comment});
    await blog.save();    

    console.log(blog)
    res.status(200).json({
      success: true,
      message: "comment added successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}