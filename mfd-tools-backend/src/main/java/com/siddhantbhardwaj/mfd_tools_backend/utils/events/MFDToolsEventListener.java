package com.siddhantbhardwaj.mfd_tools_backend.utils.events;

import com.siddhantbhardwaj.mfd_tools_backend.models.business_objects.EmailEvent;
import com.siddhantbhardwaj.mfd_tools_backend.utils.EmailSenderApp;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects.EmailSendingEvent;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects.FileWithAttachment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MFDToolsEventListener {

    private static final Logger mfdToolsEventListener = LoggerFactory.getLogger(MFDToolsEventListener.class);

    @Value("${host.emailLink}")
    private String emailLinkHost;

    @Autowired
    private EmailSenderApp emailSenderApp;

    @Async
    @EventListener
    public void handleEmailSendingEvent(EmailSendingEvent emailSendingEvent) throws Exception{
        mfdToolsEventListener.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),emailSendingEvent);
        try{
            EmailEvent emailEvent = emailSendingEvent.getEmailEvent();
            emailSenderApp.sendEmailWithTemplate(emailEvent.getTo(),emailEvent.getSubject(),emailEvent.getTemplateName(),emailEvent.getContext());
        }catch (final Exception e){
            mfdToolsEventListener.error("Error occurred at: {}",e);
            e.printStackTrace();
            throw  e;
        }
    }

    @Async
    @EventListener
    public void sendFileWithAttachment(FileWithAttachment fileWithAttachment) throws Exception{
        mfdToolsEventListener.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),fileWithAttachment);
        try {
            EmailEvent emailEvent = fileWithAttachment.getEmailEvent();
            emailSenderApp.sendEmailWithAttachment(emailEvent.getTo(),emailEvent.getSubject(),
                    emailEvent.getTemplateName(),emailEvent.getContext(),
                    fileWithAttachment.getFileData(),fileWithAttachment.getFileName());
        }catch (final Exception e){
            mfdToolsEventListener.error("Error occurred at: {}",e);
            e.printStackTrace();
            throw e;
        }
    }

}
