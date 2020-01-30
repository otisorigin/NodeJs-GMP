//type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

class GroupDTO {
    constructor(
      public id: number,
      public name: string,
      public permissions: string
    ) {}
  }
  
  export default GroupDTO;