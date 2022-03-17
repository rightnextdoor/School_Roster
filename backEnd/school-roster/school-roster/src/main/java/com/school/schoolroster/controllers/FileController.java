package com.school.schoolroster.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.school.schoolroster.models.FileDB;
import com.school.schoolroster.models.MyUserDetails;
import com.school.schoolroster.models.User;
import com.school.schoolroster.payload.CurrentUser;
import com.school.schoolroster.services.FileStorageService;
import com.school.schoolroster.services.MyUserDetailsService;
import com.school.schoolroster.util.ResponseFile;
import com.school.schoolroster.util.ResponseMessage;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
  @Autowired
  private FileStorageService storageService;
  @Autowired
  MyUserDetailsService myUserDetailsService;
  
  @PostMapping("/upload")
  public ResponseEntity<ResponseMessage> uploadFile(@CurrentUser MyUserDetails myUserDetails,
		  @RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      User user = myUserDetailsService.getUser(myUserDetails.getUsername());
      storageService.store(file,user);
      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }
  
  @PostMapping("/upload/replace")
  public ResponseEntity<ResponseMessage> replaceFile(@CurrentUser MyUserDetails myUserDetails,
		  @RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      User user = myUserDetailsService.getUser(myUserDetails.getUsername());
      storageService.replacePhoto(file,user);
      message = "Replaced the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not replace the file: " + file.getOriginalFilename() + "!";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
    }
  }
  
  @GetMapping("/files")
  public ResponseEntity<List<ResponseFile>> getListFiles() {
    List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
      String fileDownloadUri = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(dbFile.getId())
          .toUriString();
      return new ResponseFile(
          dbFile.getName(),
          fileDownloadUri,
          dbFile.getType(),
          dbFile.getData().length);
    }).collect(Collectors.toList());
    return ResponseEntity.status(HttpStatus.OK).body(files);
  }
  
  @GetMapping("/files/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable String id) {
    FileDB fileDB = storageService.getFile(id);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
        .body(fileDB.getData());
  }
  
  @GetMapping("/files/user")
  public ResponseEntity<byte[]> getFile(@CurrentUser MyUserDetails myUserDetails) {
	  User user = myUserDetailsService.getUser(myUserDetails.getUsername());
	  FileDB fileDB = storageService.getPhoto(user);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
        .body(fileDB.getData());
  }
}
