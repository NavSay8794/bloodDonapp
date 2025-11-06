import express from "express";
import BloodRequest from "../models/BloodModel.js";
import { decodeToken } from "../utils/utils.js";

const router = express.Router();

router.post("/new", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const {_id, email} = await decodeToken(token)

    const { title, bloodg, unit, hospital, contact, city, description } = req.body;
    const newBloodReq = new BloodRequest({
        title: title,
        bloodg: bloodg,
        unit: unit,
        hospital: hospital,
        contact: contact,
        city: city,
        description: description,
        status: 'open',
        userId: _id
    })

    await newBloodReq.save()
    res.status(201).json({
        success: true,
        message: 'New Blood Request Created Successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const {_id, email} = await decodeToken(token)
    // console.log(user)
    const reqsData = await BloodRequest.find({userId: _id})
    
    res.status(201).json({
        success: true,
        message: 'Blood Requests found',
        reqsData
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/:id', async (req,res,next)=>{
  try {

    const selectedRequest = await BloodRequest.findOne({_id: req.params.id})
    if(!selectedRequest){
      return res.status(404).json({
        success: false,
        message:'Not Found'
      })
    }

    res.status(200).json({
      success:true,
      selectedRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

router.put('/:id', async (req,res,next)=>{
  try {
    const selectedRequest = await BloodRequest.findOneAndUpdate({_id: req.params.id},
      {$set: req.body},
      {new: true, runValidators: true, context: 'query' }
    )

    if(!selectedRequest){
      return res.status(404).json({
        success: false,
        message:'Not Found'
      })
    }

    res.status(201).json({
      success:true,
      selectedRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

router.delete('/:id', async (req,res,next)=>{
  try {
    const selectedRequest = await BloodRequest.findOneAndDelete({_id: req.params.id})

    res.status(200).json({
      success:true,
      message: 'Blood Request Deleted Successfullt'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})


export default router