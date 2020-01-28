// export const WEB_URL = "http://192.168.1.21:4200";
// export const API_URL = "http://192.168.1.21:9008";
// export const SOCKET_URL = "http://192.168.1.21:9009";

export const WEB_URL = "http://ec2-3-215-183-243.compute-1.amazonaws.com:4200";
export const API_URL = "http://ec2-3-215-183-243.compute-1.amazonaws.com:9008";
export const SOCKET_URL = "http://ec2-3-215-183-243.compute-1.amazonaws.com:9009";

// export const WEB_URL = "http://www.mytreatmenttime.com:4200";
// export const API_URL = "http://www.mytreatmenttime.com:9008";
// export const SOCKET_URL = "http://www.mytreatmenttime.com:9009";

// export const WEB_URL = "http://localhost:4200";
// export const API_URL = "http://localhost:9008";
// export const SOCKET_URL = "http://localhost:9009";

// export const EMAIL_REGEX = /.[\w.\-]+.(@gmail|@yopmail|@yahoo)\.(com|in|info)$/;
// export const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,5})$/i;
// export const EMAIL_REGEX = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,50})(.)([\w]{2,10})(\.[\w]{2,5})+$/;
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASS_REGEX = /^(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#]).*[a-zA-z0-9]$/;
export const white_space_regex = /^[^-\s]/;
export const must_alphanumeric_regex = /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/;
export const digit_regex = /^[0-9]/;
