package com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects;

import com.siddhantbhardwaj.mfd_tools_backend.models.business_objects.EmailEvent;
import org.springframework.context.ApplicationEvent;

import java.util.Arrays;

public class FileWithAttachment extends ApplicationEvent {

    private byte[] fileData;

    private EmailEvent emailEvent;

    private String fileName;

    public FileWithAttachment(EmailEvent emailEvent, byte[] fileData,String fileName) {
        super(emailEvent);
        this.emailEvent=emailEvent;
        this.fileData=fileData;
        this.fileName=fileName;
    }


    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public EmailEvent getEmailEvent() {
        return emailEvent;
    }

    public void setEmailEvent(EmailEvent emailEvent) {
        this.emailEvent = emailEvent;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @Override
    public String toString() {
        return "FileWithAttachment{" +
                "fileData=" + Arrays.toString(fileData) +
                ", emailEvent=" + emailEvent +
                ", fileName='" + fileName + '\'' +
                '}';
    }

}
