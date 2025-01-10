$(function () {
    // Validate and submit the form using jqBootstrapValidation plugin
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true, // Prevent the form from submitting the traditional way
        submitError: function ($form, event, errors) {
            // You can add custom error handling here if needed
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Prevent form submission to handle it via AJAX

            // Get form field values
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            // Disable the submit button to prevent multiple submissions
            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Send data via AJAX to the Node.js server
            $.ajax({
                url: "http://localhost:3000/contact", // Node.js server endpoint
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                success: function (response) {
                    // If message sent successfully
                    if (response.message === "Your message has been sent successfully!") {
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                        $('#success > .alert-success').append("<strong>Your message has been sent.</strong>");
                        $('#success > .alert-success').append('</div>');
                    } else {
                        // In case of an error
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                        $('#success > .alert-danger').append("<strong>" + response.message + "</strong>");
                        $('#success > .alert-danger').append('</div>');
                    }

                    // Reset the form after submission
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // If AJAX fails
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, something went wrong. Please try again later.</strong>");
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    // Re-enable the submit button after the request completes
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    // Clear success message when the user focuses on the name field
    $('#name').focus(function () {
        $('#success').html('');
    });
});
