/* global $: true */
$(document).ready(function(){
  let selectedItems = []

  // Attach event to add 'active' class to the parent LI element, if selected
  const getEntry = (e) => {
    let liElem = e.target.parentElement.parentElement
    let type = e.target.type
    let value = liElem.getAttribute("value")
    let index = selectedItems.indexOf(value)

    // For checkbox selection
    if (type === "checkbox") {
      // Add item value to selected list if it is checked and doesnt already exist
      if (e.target.checked && index === -1) {
        selectedItems.push(value)
        liElem.classList.add("active")
      } else {
        // Remove item value from selected list if it is unchecked
        if (!e.target.checked && index !== -1) {
          selectedItems.splice(index, 1)
        }
        liElem.classList.remove("active")
      }
    // For deletion
    } else {
      if (index !== -1) {
        selectedItems.splice(index, 1)
      }
      liElem.classList.remove("active")
      return value;
    }
  }

  // Attach event to delete entry from the listen
  const deleteItem = (e) => {
    const item = getEntry(e)
    $.ajax({
      url: "/deleteItem",
      method: "POST",
      data: {
        "value": item
      },
      success: (resp) => {
        $("#list-container").html(resp)
        $("#item-text-input").val("")
        selectedItems = []
        getEventHandlers();
      },
      error: (err) => {
        console.log(new Error(err))
      }
    })
  }

  // Attach event to add items to the todo list
  const sendData = (e) => {
    // Only if enter is pressed, you can proceed
    if (e.type === "keypress" && e.which !== 13) {
      return
    }
    let newItem = $("#item-text-input").val()
    $.ajax({
      url: "/add2List",
      method: "POST",
      data: {
        "todo": newItem
      },
      success: (resp) => {
        $("#list-container").html(resp)
        $("#item-text-input").val("")
        selectedItems = []
        getEventHandlers();
      },
      error: (err) => {
        console.log(new Error(err))
      }
    })
  }

  // Attach event to update entry from the listen
  const completeItem = (e) => {
    const item = getEntry(e)
    $.ajax({
      url: "/completeItem",
      method: "PUT",
      data: {
        "value": item
      },
      success: (resp) => {
        $("#list-container").html(resp)
        $("#item-text-input").val("")
        selectedItems = []
        getEventHandlers();
      },
      error: (err) => {
        console.log(new Error(err))
      }
    })
  }

  /*
   Since the list is re-rendered everytime we add/delete an entry,
   we must rebind the events. This is actually not a good practice.
   React will fix this
  */
  const getEventHandlers = () => {
    $("ul li input:checkbox").change(getEntry);
    // Do not delete or update 'Completed' items
    $("li:not(.item-completed) .item-remove-btn").click(deleteItem)
    $("li:not(.item-completed) .item-complete-btn").click(completeItem)
  }

  // Bind all event handlers
  $("#item-text-input").keypress(sendData)
  $("#send-btn").click(sendData)
  getEventHandlers();

});

// $(window).on("deviceorientation orientationchange", () => {
//   switch(window.orientation) {
//     case 90 || -90: $("html").addClass("landscape")
//                     $("html").removeClass("portrait")
//                     break
//     default: $("html").addClass("portrait")
//             $("html").removeClass("landscape")
//   }
// });
