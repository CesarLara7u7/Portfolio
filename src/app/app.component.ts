import {AfterViewInit, Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("nav") nav!: ElementRef
  @ViewChildren('workBox', {read: ElementRef}) workEls!: ElementRef[];
  @ViewChildren('image', {read: ElementRef}) image!: ElementRef[];
  @ViewChild("checkBox") checkBox!: HTMLInputElement
  skillsImages: Array<{ src: string, title: string }> = [
    {
      title: "Scala",
      src: "assets/images/skills/scala.svg"
    },
    {
      title: "Angular",
      src: "assets/images/skills/angular.svg"
    },
    {
      title: "Akka",
      src: "assets/images/skills/akka.svg"
    },
    {
      title: "Java",
      src: "assets/images/skills/java.svg"
    },
    {
      title: "MySQL",
      src: "assets/images/skills/mysql.svg"
    },
    {
      title: "Postgres",
      src: "assets/images/skills/postgres.svg"
    },
    {
      title: "Docker",
      src: "assets/images/skills/docker.svg"
    },
    {
      title: "PHP",
      src: "assets/images/skills/php.svg"
    },
    {
      title: "Primeng",
      src: "assets/images/skills/primeng.svg"
    },
    {
      title: "Intellij",
      src: "assets/images/skills/intellij.svg"
    },
  ]
  storedTheme = localStorage.getItem("theme");

  workBoxesObserver: IntersectionObserver
  isMenuShowing = false
  formSendEmail: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.workBoxesObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const [textbox, picture] = Array.from(entry.target.children);
        if (entry.isIntersecting) {
          picture.classList.remove("transform");
          Array.from(textbox.children).forEach(
            (el: any) => {
              (el.style.animationPlayState = "running")
            }
          );
        }
      },
      {threshold: 0.3}
    );
    this.formSendEmail = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      request: ['', [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    this.checkBox.checked = localStorage.getItem("theme") == "dark"
    this.initWorkElementsObs()
    this.initImages()
  }

  onToggleNav() {
    this.toggleNav();
  }

  toggleNav() {
    this.nav.nativeElement.classList.toggle("hidden");

    // Prevent screen from scrolling when menu is opened
    document.body.classList.toggle("lock-screen");

    this.isMenuShowing = !this.isMenuShowing;
  }

  onEscape($event: KeyboardEvent) {
    if ($event.key === "Escape" && !this.nav.nativeElement.classList.contains("hidden")) {
      this.toggleNav();
    }
  }

  private initWorkElementsObs() {
    this.workEls.forEach(element => {
      this.workBoxesObserver.observe(element.nativeElement);
    });
  }

  private initImages() {
    this.image.forEach((workImg) => workImg.nativeElement.classList.add("transform"));
  }

  onSwitchDarkMode() {
    this.checkBox.checked = !this.checkBox.checked;
    if (this.checkBox.checked) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    this.currentColor()
  }

  currentColor() {
    return this.storedTheme == "dark" ? "white" : "black";
  }

  onSendRequest() {
    console.log(this.formSendEmail.value)
  }
}
