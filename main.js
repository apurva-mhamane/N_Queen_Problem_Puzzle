function download(file, text) { 

        //creating an invisible element 
        var element = document.createElement('a'); 
        element.setAttribute('href', 'data:text/plain;charset=utf-8, ' 
                             + encodeURIComponent(text)); 
        element.setAttribute('download', file); 

        //the above code is equivalent to 
        // <a href="path of file" download="file name"> 

        document.getElementById("quiz body").appendChild(element); 

        //onClick property 
        element.click(); 

        document.getElementById('quiz body').removeChild(element); 
    } 

function loadquiz(){
	document.getElementById('quiz body').style.display="block";
	document.getElementById('inital').style.display='none';

	var quizContainer = document.getElementById('quiz');
	var resultsContainer = document.getElementById('results');
	var submitButton = document.getElementById('submit');
	var myQuestions = [
		{
			question: "1.  In how many directions do queens attack each other?",
			answers: {
				a: '1',
				b: '2',
				c: '3',
				d: '4'
			},
			correctAnswer: 'c'

		},
		{
			question: "2. Placing n-queens so that no two queens attack each other is called?",
			answers: {
				a: 'n-queen’s problem',
				b: '8-queen’s problem',
				c: 'Hamiltonian circuit problem',
				d: 'subset sum problem'
			},
			correctAnswer: 'a'

		},
		{
			question: "3. Where is the n-queens problem implemented?",
			answers: {
				a: 'carom',
				b: 'chess',
				c: 'ludo',
				d: 'cards'
			},
			correctAnswer: 'b'
			
		},
		{
			question: "4.  In n-queen problem, how many values of n does not provide an optimal solution?",
			answers: {
				a: '1',
				b: '2',
				c: '3',
				d: '4'
			},
			correctAnswer: 'b'
			
		},
		{
			question: "5. Which of the following methods can be used to solve n-queen’s problem?",
			answers: {
				a: 'greedy algorithm',
				b: 'divide and conquer',
				c: 'iterative improvement',
				d: 'backtracking'
			},
			correctAnswer: 'd'
			
		},
	];


	function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

		function showQuestions(questions, quizContainer){
			
			var output = [];
			var answers;

			// for each question...
			for(var i=0; i<questions.length; i++){
				
				// first reset the list of answers
				answers = [];

				// for each available answer to this question...
				for(letter in questions[i].answers){

					// ...add an html radio button
					answers.push(
						'<label>'
							+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
							+ letter + ': '
							+ questions[i].answers[letter]
						+ '</label>'
					);
				}

				// add this question and its answers to the output
				output.push(
					'<div class="question">' + questions[i].question + '</div>'
					+ '<div class="answers">' + answers.join('') + '</div>'
				);
			}

			// finally combine our output list into one string of html and put it on the page
			quizContainer.innerHTML = output.join('');
				// code will go here
		}
		

		function showResults(questions, quizContainer, resultsContainer){
			var answerContainers = quizContainer.querySelectorAll('.answers');
		
			// keep track of user's answers
			var userAnswer = '';
			var selectedAns={"questionNO":"answer"};
			var numCorrect = 0;
			
			// for each question...
			for(var i=0; i<questions.length; i++){

				// find selected answer
				userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
				selectedAns[i+1]=userAnswer;
				console.log(userAnswer)
				
				
				// if answer is correct
				if(userAnswer===questions[i].correctAnswer){
					// add to the number of correct answers
					numCorrect++;
					
					// color the answers green
					answerContainers[i].style.color = 'lightgreen';
				}
				// if answer is wrong or blank
				else{
					// color the answers red
					answerContainers[i].style.color = 'red';
				}
			}

			// show number of correct answers out of total
			alert('Hey, You got '+ numCorrect + ' out of ' + questions.length)
			resultsContainer.innerHTML = 'You got '+ numCorrect + ' out of ' + questions.length;
				// code will go here
					// Start file download. 
		    document.getElementById("selectedAns").addEventListener("click", function() { 
		        // Generate download of hello.txt file with some content 
		        
		        var filename = "Results.doc"; 

		        download(filename, JSON.stringify(selectedAns).split(",").join("\n")); 
    }, false); 
		}

		// show the questions
		showQuestions(questions, quizContainer);

		// when user clicks submit, show results
		submitButton.onclick = function(){
			showResults(questions, quizContainer, resultsContainer);

			var viewAnswer=document.getElementById("secondbutton")
			viewAnswer.style.display='inline-block'
			viewAnswer.onclick=function (){
				window.open('answers.html',"_blank")
			}

			var saveAns=document.getElementById("selectedAns")
			saveAns.style.display='block'
			
			
			

		}
	}
	generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

}
