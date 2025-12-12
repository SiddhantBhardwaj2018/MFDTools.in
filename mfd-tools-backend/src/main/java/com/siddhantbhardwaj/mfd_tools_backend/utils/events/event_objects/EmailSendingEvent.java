package com.siddhantbhardwaj.mfd_tools_backend.utils.events.event_objects;

import com.siddhantbhardwaj.mfd_tools_backend.models.business_objects.EmailEvent;
import org.springframework.context.ApplicationEvent;

public class EmailSendingEvent extends ApplicationEvent {

    private EmailEvent emailEvent;


    public EmailSendingEvent(EmailEvent emailEvent) {
        super(emailEvent);
        this.emailEvent=emailEvent;
    }

    public EmailEvent getEmailEvent() {
        return emailEvent;
    }

    public void setEmailEvent(EmailEvent emailEvent) {
        this.emailEvent = emailEvent;
    }

    @Override
    public String toString() {
        return "EmailSendingEvent{" +
                "emailEvent=" + emailEvent +
                '}';
    }

}
