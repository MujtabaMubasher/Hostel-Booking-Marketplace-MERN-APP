const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	addressLine2: {
		type: String,
	},
	addressLines: {
		type: String,
	},
	city: {
		type: String,
	},
	cnic: {
		type: String,
	},
	contactNo: {
		type: String,
	},
	country: {
		type: String,
	},
	email: {
		type: String,
	},
	firstName: {
		type: String,
	},
	hostelAddress: {
		type: String,
	},
	hostelName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	stateProvince: {
		type: String,
	},
	zipCode: {
		type: String,
	},
	gender: {
		type: String,
	},
	hostelPics: {
		 public_id: {
      type: String,
       
    },
    url: {
      type: String,
       
    },
	},
	cnicPicBack: {
		 public_id: {
      type: String,
       
    },
    url: {
      type: String,
       
    },
	},
	cnicPicFront: {
		public_id: {
			type: String,
			 
		  },
		  url: {
			type: String,
			 
		  },
	},
	policeVerificationCert: {
		 public_id: {
      type: String,
       
    },
    url: {
      type: String,
       
    },
	},
	verificationCert: {
		 public_id: {
      type: String,
       
    },
    url: {
      type: String,
       
    },
	},
	govtLicense: {
		 public_id: {
      type: String,
       
    },
    url: {
      type: String,
       
    },
	},
	confirmed: {
		type: Boolean,
		default: false
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	}
})

const Post = new mongoose.model("POST", postSchema);

module.exports = Post;