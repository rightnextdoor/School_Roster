package com.school.schoolroster.services;

import java.io.IOException;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.school.schoolroster.models.FileDB;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.repository.FileDBRepository;
import com.school.schoolroster.repository.ProfileRepository;

@Service
public class FileStorageService {
  @Autowired
  private FileDBRepository fileDBRepository;
  @Autowired
  private ProfileRepository profileRepository;
  @Autowired
  ProfileService profileService;
  
  public FileDB store(MultipartFile file, User user) throws IOException {
	 
	  String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    
    FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes(), user);
    
    return fileDBRepository.save(FileDB);
  }
  
  public FileDB replacePhoto(MultipartFile file, User user) throws IOException {
	  String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	 
	  FileDB replaceDb = getPhoto(user);
	  replaceDb.setName(fileName);
	  replaceDb.setType(file.getContentType());
	  replaceDb.setData(file.getBytes());
	 
	 return fileDBRepository.save(replaceDb);
}
  
  public void deletePhoto(String photoId) {
	  fileDBRepository.deletePhoto(photoId);
  }
  
  public FileDB getPhoto(User user) {
	return  fileDBRepository.findByUserId(user.getId()).get();
  }
  
  public FileDB getFile(String id) {
    return fileDBRepository.findById(id).get();
  }
  
  public Stream<FileDB> getAllFiles() {
    return fileDBRepository.findAll().stream();
  }
}
