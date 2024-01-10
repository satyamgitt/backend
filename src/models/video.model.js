import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,   // cloudarnary url 
            require: true,
        },
        thumbnail: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        duration: {
            type: Number,     // we will get duration from cloudarnary bcoz cloudarnary sends information about video after upload video 
            require: true,
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean, 
            default:true

        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"

        }

    }, {
    timestamps: true
}
)

// used one package (mongoose-aggregate-paginate-v2) for writing aggretion quries , we can write regular quries also but these aggeration quries will take this on another level
// plugin is inbuild method (middleware)
videoSchema.plugin(mongooseAggregatePaginate)



export const video = mongoose.model("Video", videoSchema)
